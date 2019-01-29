const LAYER = require('./constant/layer')

function json(str) {
  try {
    return JSON.parse(str) || {}
  } catch (e) {
    return {}
  }
}

module.exports = function(source) {
  const config = json(source)
  return Array.isArray(config.pages)
    ? LAYER.APP
    : config.component === true
    ? LAYER.COMPONENT
    : LAYER.PAGE
}
