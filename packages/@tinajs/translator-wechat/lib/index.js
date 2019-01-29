const { getLayerType, ASTUtils } = require('@tinajs/translator-utils')
const translateScript = require('./translations/script')

function transform(ast) {
  const config = ASTUtils.findBlock(ast, 'config')
  const layer = getLayerType(config.content)

  ASTUtils.visitBlock(ast, block => {
    if (block.tag === 'script') {
      block.content = translateScript(block.content, layer)
    }
  })

  return ast
}

module.exports = options =>
  Object.assign({}, options, {
    transform,
  })
