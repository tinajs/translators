const camelCase = require('camel-case')
const kebabCase = require('kebab-case')
const specific = require('./specific-tags')
const { LAYER, visitWxml } = require('@tinajs/translator-utils')
const {
  CLASSNAME_PREFIX_ROLE,
  CLASSNAME_PREFIX_SCOPE,
  UNAVAILABLE_TAGNAME_MAPPING,
  NON_BUILTIN_TAGNAME_MAPPING,
} = require('../const')

const COMMON_ATTR_MAPPING = {
  'wx:if': 'a:if',
  'wx:elif': 'a:elif',
  'wx:else': 'a:else',
  'wx:for': 'a:for',
  'wx:for-index': 'a:for-index',
  'wx:for-item': 'a:for-item',
  'wx:key': 'a:key',
}

module.exports = async function(source, { layer, config, warning, scope }) {
  const transformNode = (node, root) => {
    function addClass(classname) {
      node.attribs.class = [classname, node.attribs.class]
        .filter(Boolean)
        .join(' ')
    }
    function tagName(before, after) {
      addClass(`${CLASSNAME_PREFIX_ROLE}${before}`)
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
      specific(node, root)

      let polyfills = Object.keys(config.usingComponents || {})

      /**
       * non-builtin tagname
       */
      if (
        node.name in NON_BUILTIN_TAGNAME_MAPPING &&
        !~polyfills.indexOf(node.name)
      ) {
        warning(
          new Error(
            `<${node.name}> is not a builtin component in alipay mini program.`
          )
        )
        tagName(node.name, NON_BUILTIN_TAGNAME_MAPPING[node.name])
      }

      /**
       * unavailable tagnames
       */
      if (node.name in UNAVAILABLE_TAGNAME_MAPPING) {
        tagName(node.name, UNAVAILABLE_TAGNAME_MAPPING[node.name])
      }

      /**
       * attributes mapping
       */
      for (let key in node.attribs) {
        if (key in COMMON_ATTR_MAPPING) {
          attrName(key, COMMON_ATTR_MAPPING[key])
        }
        matchAndReplace(key, /^bind:?(.*)$/, ([, name]) => {
          attrName(key, camelCase(`on.${name}`))
        })
        matchAndReplace(key, /^catch:?(.*)$/, ([, name]) => {
          attrName(key, camelCase(`catch.${name}`))
        })
        matchAndReplace(key, /^data-(.*)$/, ([, name]) => {
          attrName(key, kebabCase(`data-${name}`))
        })
      }

      /**
       * add scope id
       */
      if (layer === LAYER.COMPONENT) {
        addClass(`${CLASSNAME_PREFIX_SCOPE}${scope}`)
      }
    }
  }

  return await visitWxml(source, transformNode)
}
