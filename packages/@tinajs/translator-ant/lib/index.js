const hasha = require('hasha')
const { getLayerType, ASTUtils } = require('@tinajs/translator-utils')
const translateTemplate = require('./translations/template')
const translateScript = require('./translations/script')

async function transform(ast, { warning }) {
  const config = ASTUtils.getConfig(ast)
  const layer = getLayerType(config)
  const scope = hasha(ast.name).slice(0, 8)

  await ASTUtils.visitBlock(ast, async block => {
    if (block.tag === 'script') {
      block.content = translateScript(block.content, {
        layer,
      })
    }
    if (block.tag === 'template') {
      block.content = await translateTemplate(block.content, {
        layer,
        config,
        scope,
        warning,
      })
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
