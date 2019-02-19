'use strict'
const utils = require('./utils')
const config = require('./configs')
const sourceMapEnabled = config.productionSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: true
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: true,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
