// 异步的钩子

class AsyncSeriesHook {
    constructor(args) {
        this.task = [];
    }

    tapAsync(name, task) {
        this.task.push(task);
    }

    callAsync(...args) {
        //很像express 依靠next的递归 来顺序执行
        let finalCallback = args.pop();
        let index = 0;
        let next = () => {
            if (index === this.task.length)  return finalCallback();
            this.task[index++](...args, next)
        };
        next();
    }
}

let hook = new AsyncSeriesHook(['name']);

hook.tapAsync('node', function (name, cb) {
    setTimeout(() => {
        console.log('node', name)
        cb();
    }, 1000)
})

hook.tapAsync('react', function (name, cb) {
    setTimeout(() => {
        console.log('react', name)
        cb();
    }, 1000)
})

hook.callAsync('huk', () => {
    console.log("the end!")
});
