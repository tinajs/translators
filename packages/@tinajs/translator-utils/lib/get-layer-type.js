const LAYER = require('./constant/layer')

module.exports = function(config) {
  return Array.isArray(config.pages)
    ? LAYER.APP
    : config.component === true
    ? LAYER.COMPONENT
    : LAYER.PAGE
}
