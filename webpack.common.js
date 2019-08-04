const { resolve } = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: resolve(__dirname, 'dist'),
        publicPath: '/',//虚拟目录,解决组件加载路径是当前路径，导致路径错误的问题
        filename: '[name]-[hash].js'//输出文件添加hash
    },
    optimization: { 
        // runtimeChunk: 'single',
        mergeDuplicateChunks: true, 
        splitChunks: {// 代替commonchunk, 代码分割
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                // vendor: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name: 'vendors',
                //     chunks: 'all'
                // }
                // 处理入口chunk
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: 'vendors',
                },
                // 处理异步chunk
                'async-vendors': {
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 2,
                    chunks: 'async',
                    name: 'async-vendors'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                exclude: /node_modules/,
                use:['vue-loader']
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: ['babel-loader']//'eslint-loader'
            },
            {
                test: /\.pug$/,
                use: ['pug-plain-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {   /* 
                当文件体积小于 limit 时，url-loader 把文件转为 Data URI 的格式内联到引用的地方
                当文件大于 limit 时，url-loader 会调用 file-loader, 把文件储存到输出目录，并把引用的文件路径改写成输出后的路径 
                */
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000
                    }
                }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin([resolve(__dirname, 'dist')]),//生成新文件时，清空生出目录
        new HtmlWebpackPlugin({
            template: './public/index.html',//模版路径
            filename: 'index.html',//生成后的文件名,默认index.html
            favicon: './public/favicon.ico',
            minify: {
                removeAttributeQuotes:true,
                removeComments: true,
                collapseWhitespace: true,
                removeScriptTypeAttributes:true,
                removeStyleLinkTypeAttributes:true
             }
        }),
        new HotModuleReplacementPlugin()//HMR
    ]
};