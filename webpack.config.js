var webpack = require('webpack')
var path = require('path')
var publicPath = 'build'

const utils = require('./webpackConfig/utils')
const vueLoaderConfig = require('./webpackConfig/vue-loader.conf')
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
    entry:{
        login:['./frontend/spas/login/main.js',hotMiddlewareScript],
        user:['./frontend/spas/user/main.js',hotMiddlewareScript],
    },
    output:{
        path: path.resolve(__dirname,'dist','public', publicPath),
        publicPath: '/build/',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'src': path.resolve(__dirname, './frontend'),
            'assets': path.resolve(__dirname, './frontend/assets'),
            'components': path.resolve(__dirname, './frontend/components')
        },
    },
    module:{
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        },{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        },{
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    }
}