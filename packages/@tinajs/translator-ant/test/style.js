import test from 'ava'
import { createMacro } from './helpers/compiler'
import translator from '..'

const macro = createMacro(translator)

test('basic', macro, {
  chainWebpack: config => {
    config.entry('/basic/page.js').add('./basic/page.mina')
    config.module
      .rule('mina')
      .use('mina')
      .options(translator())
  },
  snapshots: ['/basic/page.acss'],
})
