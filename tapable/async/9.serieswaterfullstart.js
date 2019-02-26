let { AsyncSeriesWaterfallHook } = require("tapable");

/**
 * 异步串行
 * 上一个执行完了再执行下一个 按顺序的
 * 瀑布 上一个的值传到下一个
 */

class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesWaterfallHook(['name'])
        }
    }


    tap() {
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log("node", name)
                cb(null,'node ok')
            }, 1000)
        })
        this.hooks.arch.tapAsync('react', (name, cb) => {
            setTimeout(() => {
                console.log("react", name)
                cb()
            }, 1000)
        })
    }

    start() {
        this.hooks.arch.callAsync('async huk', () => {
            console.log("the end")
        })
    }
}

let l = new Lesson();
l.tap();
l.start();