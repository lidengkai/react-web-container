// @ts-check
const baseConfig = require('./webpack.config')
const build = require('build.react/build/option.watch')
const utils = require('build.react/build/utils')
const { options, port } = require('./config')

module.exports = utils.getAutoPort(port).then(port => {
  return build(options, baseConfig, () => {
    return {
      devServer: {
        host: '127.0.0.1',
        port,
        open: true,
        proxy: {
          '/api': {
            target: 'http://127.0.0.1:10138',
            pathRewrite: {}
          },
          '/project': {
            target: 'http://127.0.0.1:10179',
            pathRewrite: {
              '^/project': '/',
            }
          },
        }
      }
    }
  })
})
