const LAYER = require('./constant/layer')
const { layerMarker } = require('./layer-marker')

function json(str) {
  try {
    return JSON.parse(str) || {}
  } catch (e) {
    return {}
  }
}

module.exports = function(source) {
  const config = json(source)
  const layer = Array.isArray(config.pages)
    ? LAYER.APP
    : config.component === true
    ? LAYER.COMPONENT
    : LAYER.PAGE
  layerMarker.update(this, layer)
  return source
}
