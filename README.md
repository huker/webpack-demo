## webpack原理相关的练习

###tapable基础
/tapable

###webpack微实现
/webpack-rewrite

- 整体思路
- 分析和处理
- 创建依赖关系
- AST解析
- 打包结果生成
- 添加loader
- 添加plugins

#### 整体思路
写个简单的有引入的文件，然后npx webpack打包一下看下打包出来的内容是什么。

```javascript
(function (modules) { 
    var installedModules = {};
    function __webpack_require__(moduleId) {
        //....太长了 省略一些代码 
        //这边就是webpack自己实现的一个require方法
        return module.exports;
    }
    //"./src/index.js"入口文件
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
    //传入的模块依赖关系
({
    "./src/a.js": (function (module, exports, __webpack_require__) {
        eval("var b = __webpack_require__(\"./src/b.js\");\n\nvar a = 'a' + b;\nmodule.exports = a;\n\n//# sourceURL=webpack:///./src/a.js?");
    }),
    "./src/b.js": (function (module, exports) {
        eval("b = 'b';\nmodule.exports = b\n\n//# sourceURL=webpack:///./src/b.js?");
    }),
    "./src/index.js": (function (module, exports, __webpack_require__) {
        eval("var a = __webpack_require__(\"./src/a.js\");\n\nconsole.log(a)\n\n//# sourceURL=webpack:///./src/index.js?");
    })
});
```

把打包出来的内容缩减了一下，重点是3个地方

- 实现的require方法
- 去执行的入口文件
- 传入的这个对象（解析出来的模块的依赖关系）

那就来尝试达到上面这个打包的效果，新建个项目叫my-pack好了，初始化后在package.json中添加bin，来指定命令行执行的路径。在执行文件头部加上如下的代码，来指定这代码是在node环境下跑的。

接着我们把my-pack链接到npm全局，这样才能在别的项目中命令行中使用，`npm link` 即可。最后在要打包的项目中，link下我们全局的my-pack，`npm link my-pack` 这样my-pack就安装到项目中了，可以`npx my-pack`来执行。

```json
//package.json
"bin": {
    "my-pack":"./bin/index.js"
}

// bin/index.js
#! /usr/bin/env node
console.log("hello")
```

#### 分析和处理

- 读取webpack.config.js配置

- 这边可以参考在node环境下运行webpack打包。

  所以我们也创建一个用来编译的类，叫Compiler，实例化的时候把config传进去，运行run就是进行编译

  ```javascript
  //平时node环境下运行webpack打包的代码
  const webpack = require('webpack');
  let compiler = webpack(mergeConfig);
  compiler.run();
  ```

- Compiler类中，需要保存下来入口和模块依赖，大概的逻辑和要做的事情如下伪代码

  ```javascript
  class Compiler {
      constructor(config) {
          this.config = config;
          //打包文件中的入口  ./src/index.js
          this.entryId;
          //模块依赖
          this.modules = {};
          //配置中的入口路径
          this.entry = config.entry;
          //入口路径是相对路径 我们需要手动加上工作路径
          this.root = process.cwd();
      }
      buildModules(modulePath, isEntry) {...}
      emitBundle(){...}
      run() {
          //执行 并生成模块依赖
          this.buildModules(path.resolve(this.root, this.entry), true);
          //发射打包的文件
          this.emitBundle();
      }
  }
  ```

#### 创建依赖关系

这一步就是buildModules的内容。

思路是调用buildModules首先传入的是入口文件，解析后得到模块源码和模块依赖，如果有依赖就继续解析，形成递归。

```javascript
//构建模块 生成模块的依赖关系
//modulePath绝对路径 isEntry是否主入口
buildModal(modulePath, isEntry) {
        //拿到模块内容  getSource只是读取文件的方法，拎出来写了
        let source = this.getSource(modulePath);
        //拿到模块id "./src/a.js"这样 是相对路径 其实就是modulePath-root路径
        let moduleName = './' + path.relative(this.root, modulePath);
        //如果是主入口的话存起来
        if (isEntry) {
            this.entryId = moduleName;
        }
        //接下来要把文件中的require替换成__webpack_require__ 把比如"./a.js"变成"./src/a.js"
        //解析源码进行改造 返回一个依赖列表（看继续有没有要遍历下去的）
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName)); // "./src"
        //获得改造后的源码 放进this.modules中 （把相对路径和模块中的内容对应起来）
        this.modules[moduleName] = sourceCode;
        //有依赖 继续递归
        if (dependencies && dependencies.length > 0) {
            dependencies.forEach((dep) => {
                this.buildModal(path.resolve(this.root, dep), false)
            })
        }
}
```

#### AST解析语法树

这一步就是parse的内容，解析读取到的模块的内容。

- 替换require，替换依赖的路径，把修改后的模板放进sourceCode
- 把依赖放进dependencies数组中

用到了几个库来做这件事：

1.babylon 主要是把源码解析成AST

2.@babel/traverse 遍历节点（遍历到对应的节点）

3.@babel/types 替换遍历到的节点

4.@babel/generator 替换好的结果生成

(traverse和generator是es6模块 引用的时候要require('@babel/traverse').default 不然默认导出的是一个对象)

#### 打包结果生成

- 获取打包后文件输出的路径
- 写一个打包后文件的ejs模板，把入口和模块依赖传进去
- 写入文件

#### 添加loader

思路是在读取每个依赖模块的时候，获取所有的rules，modulePath正则匹配下每个rule的test，匹配到就通过loader转化这个模块。

#### 添加plugins

在实例化的时候apply所有plugins



