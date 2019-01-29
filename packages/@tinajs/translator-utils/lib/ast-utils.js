const ASTUtils = {
  findBlock(ast, tag) {
    return ast.blocks.find(block => block.tag === tag)
  },
  async visitBlock(ast, onBlock) {
    await Promise.all(ast.blocks.map(async block => await onBlock(block)))
  },
}

module.exports = ASTUtils
