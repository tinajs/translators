const json = require('./json')

const ASTUtils = {
  findBlock(ast, tag) {
    return ast.blocks.find(block => block.tag === tag)
  },
  async visitBlock(ast, onBlock) {
    await Promise.all(ast.blocks.map(async block => await onBlock(block)))
  },
  getConfig(ast) {
    return json((ASTUtils.findBlock(ast, 'config') || {}).content)
  },
}

module.exports = ASTUtils
