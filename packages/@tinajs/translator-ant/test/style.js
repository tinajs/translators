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

test('tagname-unavailable', macro, {
  chainWebpack: config => {
    config
      .entry('/style/tagname-unavailable.js')
      .add('./style/tagname-unavailable.mina')
    config.module
      .rule('mina')
      .use('mina')
      .options(translator())
  },
  snapshots: ['/style/tagname-unavailable.acss'],
})

test('tagname-non-builtin', macro, {
  chainWebpack: config => {
    config
      .entry('/style/tagname-non-builtin.js')
      .add('./style/tagname-non-builtin.mina')
    config.module
      .rule('mina')
      .use('mina')
      .options(translator())
  },
  snapshots: ['/style/tagname-non-builtin.acss'],
})

test('tagname-polyfill', macro, {
  chainWebpack: config => {
    config
      .entry('/style/tagname-polyfill.js')
      .add('./style/tagname-polyfill.mina')
    config.module
      .rule('mina')
      .use('mina')
      .options(translator())
  },
  snapshots: ['/style/tagname-polyfill.acss'],
})
