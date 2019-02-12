class SyncWaterfullHook {
    constructor(args) {
        this.task = [];
    }

    tap(name, task) {
        this.task.push(task);
    }

    //上一个的返回值传给下一个数组中的函数
    call(...args) {
        let [first, ...others] = this.task;
        let res = first(...args);
        others.reduce((preValue, currentValue) => {
            return currentValue(preValue)
        }, res)
    }
}

let hook = new SyncWaterfullHook(['name']);

hook.tap('node', function (name) {
    console.log('node1', name);
    return 'node ok'
});

hook.tap('react', function (data) {
    console.log('react1', data);
    return 'react ok'
});

hook.tap('webpack', function (data) {
    console.log('webpack', data);
});

hook.call('huk');