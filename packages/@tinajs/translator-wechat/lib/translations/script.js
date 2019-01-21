const template = require('@babel/template').default
const visit = require('../utils/visit')
const { getLayer } = require('../utils/layer')

const DEFAULT_EXPORT_NAME = '__tina_default_export__'
const TEMPLATES = {
  DEFINE: template(`require('@tinajs/tina').LAYER.define(OPTIONS)`),
}

module.exports = function(source) {
  let layer = getLayer(this)
  let isExported = false

  let { code } = visit(source, () => ({
    AssignmentExpression(path) {
      if (isExported) {
        return
      }
      if (
        path.get('left.object').isIdentifier({ name: 'module' }) &&
        path.get('left.property').isIdentifier({ name: 'exports' })
      ) {
        path.insertAfter(
          TEMPLATES.DEFINE({
            LAYER: layer,
            OPTIONS: 'module.exports',
          })
        )
        isExported = true
      }
    },
    ExportDefaultDeclaration(path) {
      if (isExported) {
        return
      }
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
        TEMPLATES.DEFINE({
          LAYER: layer,
          OPTIONS: DEFAULT_EXPORT_NAME,
        })
      )
      isExported = true
    },
  }))
  return code
}
