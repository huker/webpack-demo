/**
 * Created by huk on 2019/2/12.
 */

let { AsyncParallelHook } = require("tapable");

/**
 * 使用promise注册 和promise all差不多的感觉
 * 在call的时候要使用promise 而不是callAsync了
 * 并且和promise all一样调用后then方法进入结果的回调
 *
 * tapable库中有三种注册的方法
 * 同步注册：
 * tap
 * 异步注册：
 * tapAsync 多一个cb
 * tapPromise 注册的promise
 *
 *
 *
 */

class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
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
            console.log("promise end")
        })
    }
}

let l = new Lesson();
l.tap();
l.start();