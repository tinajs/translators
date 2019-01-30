module.exports = function json(str) {
  try {
    return JSON.parse(str) || {}
  } catch (e) {
    return {}
  }
}
