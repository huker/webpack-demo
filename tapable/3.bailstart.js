/**
 *  同步 SyncBailHook
 *  写事件的时候可以加一个保险 称作熔断性
 *  注册的时候决定是否向下执行 就是保险
 */


let { SyncBailHook } = require('tapable');

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncBailHook(['name'])
        }
    }

    //SyncBailHook下 事件注册的时候返回undefined才会接下一个事件执行 返回了非undefined的话就断掉
    tap() {
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name)
            return '拒绝学习'
            // return undefined
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