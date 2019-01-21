const isComponent = require('../utils/is-component')

function json(str) {
  try {
    return JSON.parse(str) || {}
  } catch (e) {
    return {}
  }
}

module.exports = function(source) {
  isComponent(this, json(source).component)
  return source
}
