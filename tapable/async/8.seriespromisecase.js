// 异步的钩子 promise
// 异步promise串行实现

class AsyncSeriesHook {
    constructor(args) {
        this.task = [];
    }

    tapPromise(name, task) {
        this.task.push(task);
    }

    promise(...args) {
        //promise all的话不是一个一个顺序下去
        // 这边要打到串的效果 所以是一个promise执行后进行下一个
        let [first, ...others] = this.task;
        //和redux源码的思路是一样的

        //外面的return是这个promise方法的返回的值是一个promise
        //里面的return是每个arr中的item 要返回一个promise作为下一次的prev
        return others.reduce((prev, next) => {
            return prev.then(() => next(...args))
        }, first(...args))

    }
}

let hook = new AsyncSeriesHook(['name']);

hook.tapPromise('node', (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 1000)
    })
})

hook.tapPromise('react', (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve();
        }, 1000)
    })
})

hook.promise('huk').then(() => {
    console.log("the end!")
})
