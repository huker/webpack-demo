/**
 * Created by huk on 2019/2/12.
 */

let { AsyncParallelHook } = require("tapable");

/**
 * 异步的钩子 有串行 并行
 * 等待所有并发的异步方法执行结束后才执行回调函数
 * 同时发送多个请求
 * 注册的方法有 tap注册  tapAsync注册是异步的注册 有一回调的参数 执行了回调就代表结束了
 * 如果其中任何一个监听没有回调走出来 最后的回调函数是不会调用的
 *
 * 此处是异步并发
 */

class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
        }
    }

    tap() {
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log("node", name)
                cb();
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
        });
    }
}

let l = new Lesson();
l.tap();
l.start();