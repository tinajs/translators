import test from 'ava'
import compiler from './helpers/compiler'
import translator from '..'

const noop = () => {}

const macros = {
  async webpack(t, { chainWebpack = noop, snapshots = [] }, test = noop) {
    const { compile, mfs } = compiler(chainWebpack)
    const stats = await compile()

    t.is(stats.compilation.errors.length, 0, stats.compilation.errors)

    test(t, mfs)

    snapshots.forEach(file => {
      t.snapshot(mfs.readFileSync(file, 'utf8'), {
        id: `${t.title} - ${file}`,
      })
    })
  },
}

test(
  'app',
  macros.webpack,
  {
    chainWebpack: config => {
      config.entry('/basic/app.js').add('./basic/app.mina')
      config.module
        .rule('mina')
        .use('mina')
        .options(translator())
    },
    snapshots: ['/basic/app.js'],
  },
  (t, mfs) => {
    const file = mfs.readFileSync('/basic/app.js', 'utf8')
    t.true(file.includes(`__webpack_require__(6).App.define(module.exports);`))
  }
)

test(
  'page',
  macros.webpack,
  {
    chainWebpack: config => {
      config.entry('/basic/page.js').add('./basic/page.mina')
      config.module
        .rule('mina')
        .use('mina')
        .options(translator())
    },
    snapshots: ['/basic/page.js'],
  },
  (t, mfs) => {
    const file = mfs.readFileSync('/basic/page.js', 'utf8')
    t.true(file.includes(`__webpack_require__(8).Page.define(module.exports);`))
  }
)

test(
  'component',
  macros.webpack,
  {
    chainWebpack: config => {
      config.entry('/basic/component.js').add('./basic/component.mina')
      config.module
        .rule('mina')
        .use('mina')
        .options(translator())
    },
    snapshots: ['/basic/component.js'],
  },
  (t, mfs) => {
    const file = mfs.readFileSync('/basic/component.js', 'utf8')
    t.true(
      file.includes(`__webpack_require__(8).Component.define(module.exports);`)
    )
  }
)

test(
  'export-identifier',
  macros.webpack,
  {
    chainWebpack: config => {
      config
        .entry('/basic/export-identifier.js')
        .add('./basic/export-identifier.mina')
      config.module
        .rule('mina')
        .use('mina')
        .options(translator())
    },
    snapshots: ['/basic/export-identifier.js'],
  },
  (t, mfs) => {
    const file = mfs.readFileSync('/basic/export-identifier.js', 'utf8')
    t.true(file.includes(`const _tina_default_export =`))
    t.true(
      file.includes(`__webpack_exports__["default"] = (_tina_default_export);`)
    )
    t.true(
      file.includes(
        `_tinajs_tina__WEBPACK_IMPORTED_MODULE_1___default.a.Page.define(_tina_default_export);`
      )
    )
  }
)

test(
  'export-object',
  macros.webpack,
  {
    chainWebpack: config => {
      config.entry('/basic/export-object.js').add('./basic/export-object.mina')
      config.module
        .rule('mina')
        .use('mina')
        .options(translator())
    },
    snapshots: ['/basic/export-object.js'],
  },
  (t, mfs) => {
    // console.log(mfs.readFileSync('/basic/export-object.js', 'utf8'))
    const file = mfs.readFileSync('/basic/export-object.js', 'utf8')
    t.true(file.includes(`const _tina_default_export =`))
    t.true(
      file.includes(`__webpack_exports__["default"] = (_tina_default_export);`)
    )
    t.true(
      file.includes(
        `_tinajs_tina__WEBPACK_IMPORTED_MODULE_1___default.a.Page.define(_tina_default_export);`
      )
    )
  }
)

test(
  'export-double-times',
  macros.webpack,
  {
    chainWebpack: config => {
      config
        .entry('/basic/export-double-times.js')
        .add('./basic/export-double-times.mina')
      config.module
        .rule('mina')
        .use('mina')
        .options(translator())
    },
    snapshots: ['/basic/export-double-times.js'],
  },
  (t, mfs) => {
    const file = mfs.readFileSync('/basic/export-double-times.js', 'utf8')
    t.true(file.includes(`const _tina_default_export =`))
    t.true(
      file.includes(`__webpack_exports__["default"] = (_tina_default_export);`)
    )
    t.true(
      file.includes(
        `_tinajs_tina__WEBPACK_IMPORTED_MODULE_1___default.a.Page.define(_tina_default_export);`
      )
    )
    t.false(
      file.includes(
        `_tinajs_tina__WEBPACK_IMPORTED_MODULE_1___default.a.Page.define(module.exports);`
      )
    )
  }
)

test(
  'manual',
  macros.webpack,
  {
    chainWebpack: config => {
      config.entry('/basic/manual.js').add('./basic/manual.mina')
      config.module
        .rule('mina')
        .use('mina')
        .options(translator())
    },
    snapshots: ['/basic/manual.js'],
  },
  (t, mfs) => {
    const file = mfs.readFileSync('/basic/manual.js', 'utf8')
    t.false(
      file.includes(`__webpack_require__(8).Page.define(module.exports);`)
    )
  }
)
