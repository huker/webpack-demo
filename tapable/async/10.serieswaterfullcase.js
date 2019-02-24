//

class AsyncSeriesWaterfallHook {
    constructor(args) {
        this.task = [];
    }

    tapAsync(name, task) {
        this.task.push(task);
    }

    callAsync(...args) {

    }
}

let hook = new AsyncSeriesWaterfallHook(['name']);

hook.tapAsync('node', function (name, cb) {
    setTimeout(() => {
        console.log('node', name)
        cb(null, 'node ok');
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
