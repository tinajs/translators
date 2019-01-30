const postcss = require('postcss')
const selectorParser = require('postcss-selector-parser')
const { LAYER } = require('@tinajs/translator-utils')
const { DATASET_NAME_ROLE, DATASET_PREFIX_SCOPE, UNAVAILABLE_TAGNAME_MAPPING, NON_BUILTIN_TAGNAME_MAPPING } = require('../const')

async function doPostcss (source, plugins) {
  let result = postcss(plugins).process(source)
  let code

  if (result.isAsync) {
    code = (await result).css || ''
  } else {
    code = result.css
  }

  return code
}

const createSelectorRewriter = (name, onSelectors) => postcss.plugin(name, (options) => (root) => {
  root.each(function walk (node) {
    if (!node.selector) {
      if (node.type === 'atrule') {
        if (node.name === 'media' || node.name === 'supports') {
          node.each(walk)
        }
      }
      return
    }
    node.selector = selectorParser(selectors => {
      onSelectors(selectors, options)
    }).processSync(node.selector)
  })
})

module.exports = async function (source, { scope, layer }) {
  const plugin = createSelectorRewriter('rewrite-selector', (selectors) => {
    selectors.each(selector => {
      /**
       * add scope id
       */
      if (layer === LAYER.COMPONENT) {
        selector.insertAfter(
          selector.last,
          selectorParser.attribute({
            attribute: `${DATASET_PREFIX_SCOPE}${scope}`,
          })
        )
      }
    })
  })
  return await doPostcss(source, [
    plugin(),
  ])
}
