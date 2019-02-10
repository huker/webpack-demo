/**
 * Created by huk on 2019/2/10.
 */


//同步的钩子

class SyncHook {
    constructor(args) {
        this.task = [];
    }

    tap(name, task) {
        this.task.push(task);
    }

    call(...args) {
        this.task.forEach((task) => {
            task(...args)
        })
    }
}

let hook = new SyncHook(['name']);

hook.tap('node', function (name) {
    console.log('node1', name)
})

hook.tap('react', function (name) {
    console.log('react1', name)
})

hook.call('huk')