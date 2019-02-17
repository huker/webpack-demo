// 异步的钩子

class AsyncParallelHook {
    constructor(args) {
        this.task = [];
    }

    tapAsync(name, task) {
        this.task.push(task);
    }

    callAsync(...args) {
        console.log(args)
        //取数组最后一个 是结束后的回调的函数
        //此时args也去除了这个最后的回调 下面在task里传的参数是没有回调的
        let finalCallback = args.pop();
        let index = 0;
        let done = () => {
            index++;
            if (index === this.task.length) {
                finalCallback();
            }
        };
        this.task.forEach((task) => {
            //...args ==> 'huk'
            task(...args, done)
        })
    }
}

let hook = new AsyncParallelHook(['name']);

hook.tapAsync('node', function (name, cb) {
    setTimeout(() => {
        console.log('node1', name)
        cb();
    }, 1000)
})

hook.tapAsync('react', function (name, cb) {
    setTimeout(() => {
        console.log('react1', name)
        cb();
    }, 2000)
})

hook.callAsync('huk', () => {
    console.log("the end")
});
