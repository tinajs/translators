const hasha = require('hasha')
const { getLayerType, ASTUtils } = require('@tinajs/translator-utils')
const translateScript = require('./translations/script')
const translateTemplate = require('./translations/template')
const translateStyle = require('./translations/style')

async function transform(ast, { warning }) {
  const config = ASTUtils.getConfig(ast)
  const layer = getLayerType(config)
  const scope = hasha(ast.name).slice(0, 8)

  await ASTUtils.visitBlock(ast, async block => {
    const { content } = block
    const options = {
      layer,
      config,
      scope,
      warning,
    }
    switch (block.tag) {
      case 'script':
        block.content = translateScript(content, options)
        break
      case 'template':
        block.content = await translateTemplate(content, options)
        break
      case 'style':
        block.content = await translateStyle(content, options)
        break
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
