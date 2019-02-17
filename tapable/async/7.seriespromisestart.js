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
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("node", name)
                    resolve()
                }, 1000)
            })
        })
        this.hooks.arch.tapPromise('react', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("react", name)
                    resolve()
                }, 1000)
            })
        })
    }

    start() {
        this.hooks.arch.promise('async huk').then(() => {
            console.log("the end")
        })
    }
}

let l = new Lesson();
l.tap();
l.start();