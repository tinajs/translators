module.exports = options =>
  Object.assign(
    {},
    {
      translations: {
        script: require.resolve('./translations/script'),
      },
    },
    options
  )
