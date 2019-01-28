import test from 'ava'
import { createMacro } from './helpers/compiler'
import translator from '..'

const macro = createMacro(translator)

test(
  'app',
  macro,
  {
    chainWebpack: config => {
      config.entry('/basic/app.js').add('./basic/app.mina')
    },
    snapshots: ['/basic/app.js'],
  },
  (t, mfs) => {
    const file = mfs.readFileSync('/basic/app.js', 'utf8')
    t.true(file.includes(`).config.globals.App = App`))
    t.true(file.includes(`).App.define(module.exports);`))
  }
)

test(
  'page',
  macro,
  {
    chainWebpack: config => {
      config.entry('/basic/page.js').add('./basic/page.mina')
    },
    snapshots: ['/basic/page.js'],
  },
  (t, mfs) => {
    const file = mfs.readFileSync('/basic/page.js', 'utf8')
    t.true(file.includes(`).config.globals.Page = Page`))
    t.true(file.includes(`).Page.define(module.exports);`))
  }
)

test(
  'component',
  macro,
  {
    chainWebpack: config => {
      config.entry('/basic/component.js').add('./basic/component.mina')
    },
    snapshots: ['/basic/component.js'],
  },
  (t, mfs) => {
    const file = mfs.readFileSync('/basic/component.js', 'utf8')
    t.true(file.includes(`).config.globals.Component = Component`))
    t.true(file.includes(`).Component.define(module.exports);`))
  }
)

test(
  'export-identifier',
  macro,
  {
    chainWebpack: config => {
      config
        .entry('/basic/export-identifier.js')
        .add('./basic/export-identifier.mina')
    },
    snapshots: ['/basic/export-identifier.js'],
  },
  (t, mfs) => {
    const file = mfs.readFileSync('/basic/export-identifier.js', 'utf8')
    t.true(file.includes(`const _tina_default_export =`))
    t.true(file.includes(`exports.default = _tina_default_export;`))
    t.true(file.includes(`___default.a.config.globals.Page = Page`))
    t.true(file.includes(`___default.a.Page.define(_tina_default_export);`))
  }
)

test(
  'export-object',
  macro,
  {
    chainWebpack: config => {
      config.entry('/basic/export-object.js').add('./basic/export-object.mina')
    },
    snapshots: ['/basic/export-object.js'],
  },
  (t, mfs) => {
    // console.log(mfs.readFileSync('/basic/export-object.js', 'utf8'))
    const file = mfs.readFileSync('/basic/export-object.js', 'utf8')
    t.true(file.includes(`const _tina_default_export =`))
    t.true(file.includes(`exports.default = _tina_default_export;`))
    t.true(file.includes(`___default.a.config.globals.Page = Page`))
    t.true(file.includes(`___default.a.Page.define(_tina_default_export);`))
  }
)

test(
  'export-double-times',
  macro,
  {
    chainWebpack: config => {
      config
        .entry('/basic/export-double-times.js')
        .add('./basic/export-double-times.mina')
    },
    snapshots: ['/basic/export-double-times.js'],
  },
  (t, mfs) => {
    const file = mfs.readFileSync('/basic/export-double-times.js', 'utf8')
    t.true(file.includes(`const _tina_default_export =`))
    t.true(file.includes(`exports.default = _tina_default_export;`))
    t.true(file.includes(`___default.a.config.globals.Page = Page`))
    t.true(file.includes(`___default.a.Page.define(_tina_default_export);`))
    t.false(file.includes(`___default.a.Page.define(module.exports);`))
  }
)

test(
  'without-config',
  macro,
  {
    chainWebpack: config => {
      config
        .entry('/basic/without-config.js')
        .add('./basic/without-config.mina')
    },
    snapshots: ['/basic/without-config.js'],
  },
  (t, mfs) => {
    const file = mfs.readFileSync('/basic/without-config.js', 'utf8')
    t.true(file.includes(`).config.globals.Page = Page`))
    t.true(file.includes(`).Page.define(module.exports);`))
  }
)

test(
  'manual',
  macro,
  {
    chainWebpack: config => {
      config.entry('/basic/manual.js').add('./basic/manual.mina')
    },
    snapshots: ['/basic/manual.js'],
  },
  (t, mfs) => {
    const file = mfs.readFileSync('/basic/manual.js', 'utf8')
    t.false(file.includes(`).config.globals.Page = Page`))
    t.false(file.includes(`).Page.define(module.exports);`))
  }
)
