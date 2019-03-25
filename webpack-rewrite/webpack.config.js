/**
 * Created by huk on 2019/2/27.
 */

let path = require('path');

//监听emit的plugin
class Plugin1 {
    apply(compiler) {
        console.log("apply emit Plugin");
        //compiler里会apply所有plugin 就注册了下面的事件
        compiler.hooks.emit.tap('emit', () => {
            console.log("emit")
        })
    }
}

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    modules: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    path.resolve(__dirname, './loaders/style-loader.js'),
                    path.resolve(__dirname, './loaders/less-loader.js')
                ]
            }
        ]
    },
    plugins: [
        new Plugin1()
    ]
}