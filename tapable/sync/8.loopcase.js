class SyncLoopHook {
    constructor(args) {
        this.task = [];
    }

    tap(name, task) {
        this.task.push(task);
    }

    //函数至少执行一次 不等于undefined就继续执行 直到执行到undefined
    call(...args) {
        this.task.forEach((task) => {
            let res;
            do {
                res = task(...args);
            } while (res !== undefined)
        })

    }
}

let hook = new SyncLoopHook(['name']);
let index = 0;
hook.tap('node', function (name) {
    console.log('node1', name);
    return ++index === 3 ? undefined : 'node ok'
});

hook.tap('react', function (name) {
    console.log('react1', name);
});

hook.tap('webpack', function (name) {
    console.log('webpack', name);
});

hook.call('huk');