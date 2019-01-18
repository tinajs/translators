import path from 'path'
import webpack from 'webpack'
import Config from 'webpack-chain'
import MemoryFS from 'memory-fs'

const root = path.resolve(__dirname, '../fixtures/')

const resolve = (file) => require.resolve(file)

export default (use = () => {}) => {
  const mfs = new MemoryFS()
  const config = new Config()

  config.mode('none').context(root)

  config.output.path('/').publicPath('/').filename('[name]')

  config.module
    .rule('mina')
    .test(/\.mina$/)
    .use('mina')
    .loader(resolve('@tinajs/mina-loader'))
    .end()

  use(config)

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
