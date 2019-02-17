/**
 *  同步 SyncWaterfallHook
 *  瀑布 上一个执行的结果 传给了下一个
 *
 */


let { SyncWaterfallHook } = require('tapable');

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncWaterfallHook(['name'])
        }
    }

    tap() {
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name)
            return 'node学的还不错'
            // return undefined
        });
        this.hooks.arch.tap('react', function (data) {
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