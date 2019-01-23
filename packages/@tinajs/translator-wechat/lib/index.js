const resolve = require.resolve

module.exports = options =>
  Object.assign(
    {},
    {
      translations: {
        config: [
          resolve('@tinajs/translator-utils/lib/layer-marker-config-loader'),
        ],
        script: resolve('./translations/script'),
      },
    },
    options
  )
