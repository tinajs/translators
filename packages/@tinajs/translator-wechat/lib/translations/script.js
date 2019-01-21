const template = require('@babel/template').default
const visit = require('../utils/visit')

const DEFAULT_EXPORT_NAME = '__tina_default_export__'

module.exports = function(source) {
  let { code } = visit(source, () => ({
    AssignmentExpression(path) {
      if (
        path.get('left.object').isIdentifier({ name: 'module' }) &&
        path.get('left.property').isIdentifier({ name: 'exports' })
      ) {
        path.insertAfter(
          template.ast(`require('@tinajs/tina').Page.define(module.exports)`)
        )
      }
    },
    ExportDefaultDeclaration(path) {
      if (path.get('declaration').isIdentifier({ name: DEFAULT_EXPORT_NAME })) {
        return
      }
      path.insertBefore(
        template(`const ${DEFAULT_EXPORT_NAME} = VALUE`)({
          VALUE: path.node.declaration,
        })
      )
      path.replaceWith(template.ast(`export default ${DEFAULT_EXPORT_NAME}`))
      path.insertAfter(
        template.ast(
          `require('@tinajs/tina').Page.define(${DEFAULT_EXPORT_NAME})`
        )
      )
    },
  }))
  return code
}
