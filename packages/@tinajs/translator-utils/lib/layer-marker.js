const { relative } = require('path')

const LAYER = require('./constant/layer')

const getPath = context => relative(context.rootContext, context.resourcePath)

class LayerMarker {
  constructor() {
    this.cache = {}
  }

  update(context, layer) {
    this.cache[getPath(context)] = layer
  }

  get(context) {
    return this.cache[getPath(context)] || LAYER.PAGE
  }
}

const marker = new LayerMarker()

exports.LayerMarker = LayerMarker
exports.layerMarker = marker
