const { relative } = require('path')

let cache = {}

function isComponent(context, value) {
  const path = relative(context.rootContext, context.resourcePath)
  if (typeof value === 'undefined') {
    return cache[path]
  }
  cache[path] = value
}

module.exports = isComponent
