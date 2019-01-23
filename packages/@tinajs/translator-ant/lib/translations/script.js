const template = require('@babel/template').default
const { visitJavaScript, layerMarker } = require('@tinajs/translator-utils')

const TINA_PACKAGE_NAME = 'Tina'
const DEFAULT_EXPORT_NAME = 'tina_default_export'

const TEMPLATE = {
  CJS: `
require('@tinajs/tina').config.globals.LAYER = LAYER
require('@tinajs/tina').LAYER.define(module.exports)
`,
  ESM: `
import TINA_ID from '@tinajs/tina'
const OPTIONS_ID = OPTIONS_VALUE
TINA_ID.config.globals.LAYER = LAYER
TINA_ID.LAYER.define(OPTIONS_ID)
exports.default = OPTIONS_ID
`,
}

module.exports = function(source) {
  let layer = layerMarker.get(this)
  let isExported = false

  let { code } = visitJavaScript(source, () => ({
    AssignmentExpression(path) {
      if (isExported) {
        return
      }
      if (
        path.get('left.object').isIdentifier({ name: 'module' }) &&
        path.get('left.property').isIdentifier({ name: 'exports' })
      ) {
        path.insertAfter(
          template(TEMPLATE.CJS)({
            LAYER: layer,
          })
        )
        isExported = true
      }
    },
    ExportDefaultDeclaration(path) {
      if (isExported) {
        return
      }
      let identifiers = {
        Tina: path.scope.generateUidIdentifier(TINA_PACKAGE_NAME),
        options: path.scope.generateUidIdentifier(DEFAULT_EXPORT_NAME),
      }
      path.insertBefore(
        template(TEMPLATE.ESM)({
          TINA_ID: identifiers.Tina,
          LAYER: layer,
          OPTIONS_ID: identifiers.options,
          OPTIONS_VALUE: path.node.declaration,
        })
      )
      path.remove()
      isExported = true
    },
  }))
  return code
}
