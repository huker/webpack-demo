// 异步的钩子

class AsyncParallelHook {
    constructor(args) {
        this.task = [];
    }

    tapPromise(name, task) {
        this.task.push(task);
    }

    promise(...args) {
        // return new Promise((resolve, reject) => {
        //     let arr = this.task.map((task) => task(...args))
        //     Promise.all(arr).then(() => {
        //         resolve()
        //     })
        // });
        //上面是自己愚蠢的写法 下面是教程里的 promise all返回的也是一个promise 不必多此一举
        let _arr = this.task.map((task) => task(...args));
        return Promise.all(_arr)
    }
}

let hook = new AsyncParallelHook(['name']);

hook.tapPromise('node', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name)
            resolve();
        }, 1000)
    })
})

hook.tapPromise('react', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name)
            resolve();
        }, 2000)
    })
})

hook.promise('huk').then(() => {
    console.log("the end!")
});
