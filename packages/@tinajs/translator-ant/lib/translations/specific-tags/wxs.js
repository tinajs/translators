const DOMUtils = require('domutils')

module.exports = function wxs(node, root) {
  let cloned = Object.assign({}, node)
  cloned.name = 'import-sjs'
  root.unshift(cloned)

  DOMUtils.removeElement(node)
}
