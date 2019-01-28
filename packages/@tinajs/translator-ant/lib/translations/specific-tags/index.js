const wxs = require('./wxs')

module.exports = function(node, options) {
  if (node.name === 'wxs') {
    wxs(node, options)
  }
}
