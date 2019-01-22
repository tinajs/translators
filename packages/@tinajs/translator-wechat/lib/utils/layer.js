const { relative } = require('path')

let cache = {}

const LAYER = {
  APP: 'App',
  PAGE: 'Page',
  COMPONENT: 'Component',
}

const getPath = context => relative(context.rootContext, context.resourcePath)

function updateLayer(context, layer) {
  cache[getPath(context)] = layer
}

function getLayer(context) {
  return cache[getPath(context)]
}

exports.updateLayer = updateLayer
exports.getLayer = getLayer
exports.LAYER = LAYER
