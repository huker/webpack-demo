/**
 *  同步 SyncLoopHook 循环
 *  遇到某个不返回undefined的函数 会重复执行
 */


let { SyncLoopHook } = require('tapable');

class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new SyncLoopHook(['name'])
        }
    }

    //重复执行三次 直到第三次才返回undefined通过
    //等于是node重复学了三遍才去学react
    tap() {
        this.hooks.arch.tap('node', (name) => {
            console.log('node', name)
            return ++this.index === 3 ? undefined : 'node学的还不错'
        });
        this.hooks.arch.tap('react', (data) => {
            console.log('react', data)
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