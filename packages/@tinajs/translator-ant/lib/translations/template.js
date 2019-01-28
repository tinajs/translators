const Handler = require('domhandler')
const { Parser } = require('htmlparser2')
const render = require('htmlparser-to-html')
const camelCase = require('camel-case')
const kebabCase = require('kebab-case')
const specific = require('./specific-tags')

const DATASET_NAME_ROLE = 'data-mina-role'

const COMMON_ATTR_MAPPING = {
  'wx:if': 'a:if',
  'wx:elif': 'a:elif',
  'wx:else': 'a:else',
  'wx:for': 'a:for',
  'wx:for-index': 'a:for-index',
  'wx:for-item': 'a:for-item',
  'wx:key': 'a:key',
}
const UNAVAILABLE_TAGNAME_MAPPING = {
  ul: 'view',
  li: 'view',
  header: 'view',
  footer: 'view',
  span: 'text',
}
const NON_BUILTIN_TAGNAME_MAPPING = {
  'rich-text': 'view',
  'functional-page-navigator': 'view',
  audio: 'view',
  video: 'view',
  camera: 'view',
  'live-player': 'view',
  'live-pusher': 'view',
  'open-data': 'view',
  ad: 'view',
  'official-account': 'view',
}

/**
 * forked from https://github.com/jordancalder/walkers/blob/master/lib/walkers.js
 */
function walk(nodes, onNode = () => {}) {
  if (!nodes) {
    throw new Error('nodes is required')
  }

  let node = nodes[0]

  while (node) {
    onNode(node)

    if (node.children) {
      walk(node.children, onNode)
    }

    node = node.next
  }
}

function transform(source, onNode = () => {}, onWarning = () => {}) {
  return new Promise((resolve, reject) => {
    const handler = new Handler((error, dom) => {
      if (error) {
        reject(error)
        return
      }
      walk(dom, node => onNode(node, { root: dom, onWarning }))
      resolve(render(dom))
    })

    var parser = new Parser(handler, { xmlMode: true })
    parser.write(source)
    parser.done()
  })
}

const transformNode = (node, { root, onWarning }) => {
  function tagName(before, after) {
    node.attribs[DATASET_NAME_ROLE] = before
    node.name = after
  }

  function attrName(before, after) {
    if (before === after) {
      return
    }
    node.attribs[after] = node.attribs[before]
    delete node.attribs[before]
  }

  function matchAndReplace(str, regex, replace) {
    let matched = str.match(regex)
    if (matched) {
      replace(matched)
    }
  }

  if (node.type === 'tag') {
    specific(node, { root, onWarning })

    if (node.name in NON_BUILTIN_TAGNAME_MAPPING) {
      onWarning(
        new Error(
          `<${node.name}> is not a builtin component in alipay mini program.`
        )
      )
      tagName(node.name, NON_BUILTIN_TAGNAME_MAPPING[node.name])
    }

    if (node.name in UNAVAILABLE_TAGNAME_MAPPING) {
      tagName(node.name, UNAVAILABLE_TAGNAME_MAPPING[node.name])
    }

    for (let key in node.attribs) {
      if (key in COMMON_ATTR_MAPPING) {
        attrName(key, COMMON_ATTR_MAPPING[key])
      }
      matchAndReplace(key, /^bind:?(.*)$/, ([, name]) => {
        attrName(key, camelCase(`bind.${name}`))
      })
      matchAndReplace(key, /^catch:?(.*)$/, ([, name]) => {
        attrName(key, camelCase(`catch.${name}`))
      })
      matchAndReplace(key, /^data-(.*)$/, ([, name]) => {
        attrName(key, kebabCase(`data-${name}`))
      })
    }
  }
}

module.exports = function(source) {
  const done = this.async()
  transform(source, transformNode, warn => this.emitWarning(warn)).then(
    code => done(null, code),
    error => done(error)
  )
}
