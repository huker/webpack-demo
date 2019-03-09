/**
 * Created by huk on 2019/2/28.
 */

/**
 * 构建一个用来编译的类
 *
 * 首先要获得两个东西
 * 1.主入口存起来
 * 2.模块依赖关系放进一个对象里
 *
 * 然后把构建好的文件发射出去
 * （就是生成打包后的文件
 */
let path = require('path');
let fs = require('fs');

class Compiler {
    //编译会传进来写的webpack.config.js配置
    constructor(config) {
        this.config = config;
        //保存入口文件的路径 如例子中的 './src/index.js'
        this.entryId;
        //保存所有的模块依赖关系 xxx:xxx
        this.modules = {};
        //入口路径
        this.entry = config.entry;
        //工作路径 为了拼接entry
        this.root = process.cwd();
    }

    //读文件
    getSource(modulePath) {
        return fs.readFileSync(modulePath, 'utf-8');
    }

    /**
     * 解析源码
     * @param source 源码
     * @param parentPath 父路径
     * 方法：通过AST来解析语法树
     * babylon 主要是把源码解析成AST
     * @babel/traverse 遍历节点（遍历到对应的节点）
     * @babel/types 替换遍历到的节点
     * @babel/generator 替换好的结果生成
     * traverse和generator是es6模块 引用的时候要reuqire('@babel/traverse').default 不然默认导出的是一个对象
     */
    parse(source, parentPath) {

    }

    //构建模块 生成模块的依赖关系
    buildModal(modulePath, isEntry) {
        //拿到模块内容
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
    }

    //发射文件
    emitFile() {

    }

    run() {
        this.buildModal(path.resolve(this.root, this.entry), true);

        this.emitFile();
    }
}

module.exports = Compiler;