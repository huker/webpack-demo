#! /usr/bin/env node

/**
 * 1.在当前路径下拿到webpack.config.js文件
 * 2.
 *
 **/

let path = require('path');

//获取配置文件
let config = require(path.resolve('webpack.config.js'));

//写一个专门用来编译的类 放lib里面
let Compiler = require('../lib/Compiler.js');
let compiler = new Compiler(config);

//标识运行编译
compiler.run();