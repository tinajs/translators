import test from 'ava'
import { createMacro } from './helpers/compiler'
import translator from '..'

const macro = createMacro(translator)

test('attributes', macro, {
  chainWebpack: config => {
    config.entry('/template/attributes.js').add('./template/attributes.mina')
    config.module
      .rule('mina')
      .use('mina')
      .options(translator())
  },
  snapshots: ['/template/attributes.axml'],
})

test('tagname-unavailable', macro, {
  chainWebpack: config => {
    config
      .entry('/template/tagname-unavailable.js')
      .add('./template/tagname-unavailable.mina')
    config.module
      .rule('mina')
      .use('mina')
      .options(translator())
  },
  snapshots: ['/template/tagname-unavailable.axml'],
})

test(
  'tagname-non-builtin',
  macro,
  {
    chainWebpack: config => {
      config
        .entry('/template/tagname-non-builtin.js')
        .add('./template/tagname-non-builtin.mina')
      config.module
        .rule('mina')
        .use('mina')
        .options(translator())
    },
    snapshots: ['/template/tagname-non-builtin.axml'],
  },
  (t, mfs, stats) => {
    let { warnings } = stats.compilation
    t.true(warnings.length > 0)

    let detail = warnings.reduce(
      (memo, { details }) => `${memo}\n${details}`,
      ''
    )

    const warningDetailIncludes = tagName =>
      detail.includes(
        `<${tagName}> is not a builtin component in alipay mini program.`
      )

    t.true(warningDetailIncludes('rich-text'))
    t.true(warningDetailIncludes('functional-page-navigator'))
    t.true(warningDetailIncludes('audio'))
    t.true(warningDetailIncludes('video'))
    t.true(warningDetailIncludes('camera'))
    t.true(warningDetailIncludes('live-player'))
    t.true(warningDetailIncludes('live-pusher'))
    t.true(warningDetailIncludes('open-data'))
    t.true(warningDetailIncludes('ad'))
    t.true(warningDetailIncludes('official-account'))
  }
)
