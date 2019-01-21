module.exports = options =>
  Object.assign(
    {},
    {
      translations: {
        config: require.resolve('./translations/config'),
        script: require.resolve('./translations/script'),
      },
    },
    options
  )
