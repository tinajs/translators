import test from 'ava'
import compiler from './helpers/compiler'

const noop = () => {}

const macros = {
  async webpack(t, config = noop, test = noop) {
    const { compile, mfs } = compiler(config)
    const stats = await compile()

    t.is(stats.compilation.errors.length, 0, stats.compilation.errors)

    t.snapshot(mfs)

    test(t, mfs)
  },
}

test(
  'page',
  macros.webpack,
  config => {
    config.entry('/basic/page.js').add('./basic/page.mina')
    config.module
      .rule('mina')
      .use('mina')
      .options({
        translations: {
          script: require.resolve('..'),
        },
      })
  },
  (t, mfs) => {
    t.true(mfs.readFileSync('/basic/page.js', 'utf8').includes('module.exports = "TODO"'))

    t.pass()
  }
)
