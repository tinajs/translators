const Handler = require('domhandler')
const { Parser } = require('htmlparser2')
const render = require('htmlparser-to-html')

render.configure({ disableAttribEscape: true })

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

function transform(source, onNode = () => {}) {
  return new Promise((resolve, reject) => {
    const handler = new Handler((error, dom) => {
      if (error) {
        reject(error)
        return
      }
      walk(dom, node => onNode(node, dom))
      resolve(render(dom))
    })

    var parser = new Parser(handler, { xmlMode: true })
    parser.write(source)
    parser.done()
  })
}

module.exports = transform
