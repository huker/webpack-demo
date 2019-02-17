let { AsyncSeriesHook } = require("tapable");

/**
 * 异步串行
 * 上一个执行完了再执行下一个 按顺序的
 *
 */

class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesHook(['name'])
        }
    }

    tap() {
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log("node", name)
                cb()
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