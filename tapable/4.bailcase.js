class SyncBailHook {
    constructor(args) {
        this.task = [];
    }

    tap(name, task) {
        this.task.push(task);
    }

    call(...args) {
        //index索引 res为return返回值 undefined往下执行 否则断掉
        let index = 0;
        let res;
        do {
            res = this.task[index++](...args);
        } while (res === undefined && index < this.task.length)
    }
}

let hook = new SyncBailHook(['name']);

hook.tap('node', function (name) {
    console.log('node1', name);
    // return '停止向下执行'
});

hook.tap('react', function (name) {
    console.log('react1', name);
});

hook.call('huk');