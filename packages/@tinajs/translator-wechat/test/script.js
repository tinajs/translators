import test from 'ava'
import compiler from './helpers/compiler'
import translator from '..'

const noop = () => {}

const macros = {
  async webpack(t, config = noop, test = noop, snapshots = []) {
    const { compile, mfs } = compiler(config)
    const stats = await compile()

    t.is(stats.compilation.errors.length, 0, stats.compilation.errors)

    test(t, mfs)

    snapshots.forEach((file) => {
      t.snapshot(mfs.readFileSync(file, 'utf8'), { id: file })
    })
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
      .options(translator())
  },
  (t, mfs) => {
    t.true(
      mfs
        .readFileSync('/basic/page.js', 'utf8')
        .includes(`__webpack_require__(8).Page.define(module.exports);`)
    )
  },
  [
    '/basic/page.js',
  ]
)

test(
  'component',
  macros.webpack,
  config => {
    config.entry('/basic/component.js').add('./basic/component.mina')
    config.module
      .rule('mina')
      .use('mina')
      .options(translator())
  },
  (t, mfs) => {
    t.true(
      mfs
        .readFileSync('/basic/component.js', 'utf8')
        .includes(`__webpack_require__(8).Component.define(module.exports);`)
    )
  }
)

test(
  'export-identifier',
  macros.webpack,
  config => {
    config
      .entry('/basic/export-identifier.js')
      .add('./basic/export-identifier.mina')
    config.module
      .rule('mina')
      .use('mina')
      .options(translator())
  },
  (t, mfs) => {
    t.true(
      mfs
        .readFileSync('/basic/export-identifier.js', 'utf8')
        .includes(`const __tina_default_export__ =`)
    )
    t.true(
      mfs
        .readFileSync('/basic/export-identifier.js', 'utf8')
        .includes(`__webpack_exports__["default"] = (__tina_default_export__);`)
    )
    t.true(
      mfs
        .readFileSync('/basic/export-identifier.js', 'utf8')
        .includes(
          `__webpack_require__(8).Page.define(__tina_default_export__);`
        )
    )
  }
)

test(
  'export-object',
  macros.webpack,
  config => {
    config.entry('/basic/export-object.js').add('./basic/export-object.mina')
    config.module
      .rule('mina')
      .use('mina')
      .options(translator())
  },
  (t, mfs) => {
    t.true(
      mfs
        .readFileSync('/basic/export-object.js', 'utf8')
        .includes(`const __tina_default_export__ =`)
    )
    t.true(
      mfs
        .readFileSync('/basic/export-object.js', 'utf8')
        .includes(`__webpack_exports__["default"] = (__tina_default_export__);`)
    )
    t.true(
      mfs
        .readFileSync('/basic/export-object.js', 'utf8')
        .includes(
          `__webpack_require__(8).Page.define(__tina_default_export__);`
        )
    )
  }
)

test(
  'export-double-times',
  macros.webpack,
  config => {
    config
      .entry('/basic/export-double-times.js')
      .add('./basic/export-double-times.mina')
    config.module
      .rule('mina')
      .use('mina')
      .options(translator())
  },
  (t, mfs) => {
    t.true(
      mfs
        .readFileSync('/basic/export-double-times.js', 'utf8')
        .includes(`const __tina_default_export__ =`)
    )
    t.true(
      mfs
        .readFileSync('/basic/export-double-times.js', 'utf8')
        .includes(`__webpack_exports__["default"] = (__tina_default_export__);`)
    )
    t.true(
      mfs
        .readFileSync('/basic/export-double-times.js', 'utf8')
        .includes(
          `__webpack_require__(9).Page.define(__tina_default_export__);`
        )
    )
    t.false(
      mfs
        .readFileSync('/basic/export-double-times.js', 'utf8')
        .includes(`__webpack_require__(9).Page.define(module.exports);`)
    )
  }
)
