const resolve = require.resolve

module.exports = options =>
  Object.assign(
    {},
    {
      translations: {
        config: [
          resolve('@tinajs/translator-utils/lib/layer-marker-config-loader'),
        ],
        template: resolve('./translations/template'),
        script: resolve('./translations/script'),
      },
      extensions: {
        style: '.acss',
        template: '.axml',
      },
    },
    options
  )
