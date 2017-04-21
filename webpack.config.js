var config = {
    entry: './index.js',
    output: {
        path: './',
        filename: 'bundle.js',
    },
    devServer: {
        port: 1111,
        //添加反向代理的调试
/*        proxy: {
            '/idcard/!*': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true
            },
        }*/
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react','stage-0']
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader?modules"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            a: 'js/assets/a.js',  // 后面直接引用 require(“a”)即可引用到模块
            b: 'js/assets/b.js',
            c: 'js/assets/c.js'
        }
    },
}
module.exports = config;


