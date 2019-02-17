/**
 * Created by huk on 2019/1/29.
 */

let { SyncHook } = require('tapable');

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncHook(['name'])
        }
    }

    //发布订阅模式下的 注册监听函数
    //在钩子上注册一些函数 注册到一个数组里 然后再启动的时候依次执行
    tap() {
        //第一个参数是名字 没有实际意义 是个标识
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name)
        });
        this.hooks.arch.tap('react', function (name) {
            console.log('react', name)
        })
    }

    start() {
        //调用call的时候会让上面注册的两个方法依次执行
        this.hooks.arch.call('huk');
    }
}

let l = new Lesson();
l.tap();
l.start();