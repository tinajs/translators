import path from 'path'
import webpack from 'webpack'
import Config from 'webpack-chain'
import MemoryFS from 'memory-fs'

const root = path.resolve(__dirname, '../fixtures/')

const resolve = file => require.resolve(file)

const noop = () => {}

export const compiler = (chainWebpack = () => {}) => {
  const mfs = new MemoryFS()
  const config = new Config()

  config.mode('none').context(root)

  config.output
    .path('/')
    .publicPath('/')
    .filename('[name]')

  config.module
    .rule('mina')
    .test(/\.mina$/)
    .use('mina')
    .loader(resolve('@tinajs/mina-loader'))
    .end()

  config.externals({
    '@tinajs/tina': 'Tina',
  })

  config.optimization.runtimeChunk('single')

  chainWebpack(config)

  return {
    mfs,
    compile() {
      const compiler = webpack(config.toConfig())
      compiler.outputFileSystem = mfs
      return new Promise((resolve, reject) =>
        compiler.run((err, stats) => {
          if (err) {
            return reject(err)
          }
          resolve(stats)
        })
      )
    },
  }
}

export const createMacro = translator => async (
  t,
  { chainWebpack = noop, snapshots = [] },
  test = noop
) => {
  const { compile, mfs } = compiler(config => {
    config.module
      .rule('mina')
      .use('mina')
      .options(translator())
    chainWebpack(config)
  })
  const stats = await compile()

  t.is(stats.compilation.errors.length, 0, stats.compilation.errors)

  test(t, mfs, stats)

  snapshots.forEach(file => {
    t.snapshot(mfs.readFileSync(file, 'utf8'), {
      id: `${t.title} - ${file}`,
    })
  })
}
