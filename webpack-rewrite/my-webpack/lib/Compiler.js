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

class Compiler {
    //编译会传进来写的webpack的配置
    constructor(config) {
        this.config = config;
        //保存入口文件的路径 如例子中的 './src/index.js'
        this.entryId;
        //保存所有的模块依赖关系
        this.modules = {};
        //入口路径
        this.entry = config.entry;
        //工作路径 为了拼接entry
        this.root = process.cwd;
    }

    //生成模块的依赖关系
    buildModal(modulePath, isEntry) {

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