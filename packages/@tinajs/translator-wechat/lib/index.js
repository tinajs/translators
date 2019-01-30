const { getLayerType, ASTUtils } = require('@tinajs/translator-utils')
const translateScript = require('./translations/script')

function transform(ast) {
  const config = ASTUtils.getConfig(ast)
  const layer = getLayerType(config)

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
