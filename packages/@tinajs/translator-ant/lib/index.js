const { getLayerType, ASTUtils } = require('@tinajs/translator-utils')
const translateTemplate = require('./translations/template')
const translateScript = require('./translations/script')

async function transform(ast, { warning }) {
  const config = ASTUtils.findBlock(ast, 'config')
  const layer = getLayerType(config.content)

  await ASTUtils.visitBlock(ast, async block => {
    if (block.tag === 'script') {
      block.content = translateScript(block.content, layer)
    }
    if (block.tag === 'template') {
      block.content = await translateTemplate(block.content, layer, warning)
    }
  })

  return ast
}

module.exports = options =>
  Object.assign(
    {},
    {
      transform,
      extensions: {
        style: '.acss',
        template: '.axml',
      },
    },
    options
  )
