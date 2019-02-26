//

class AsyncSeriesWaterfallHook {
    constructor(args) {
        this.task = [];
    }

    tapAsync(name, task) {
        this.task.push(task);
    }

    callAsync(...args) {
        let finishCallback = args.pop();
        let index = 0;
        // let next = (value) => {
        //     this.task[index++](value, (err, value) => {
        //         if (err || index === this.task.length) {
        //             finishCallback();
        //         } else {
        //             next(value)
        //         }
        //     })
        // };
        // next(...args)
        let next = (err, data) => {
            let task = this.task[index];
            if (!task) return finishCallback();
            if (index === 0) {
                task(...args, next)
            } else {
                task(data, next)
            }
            index++;
        };
        next(null, ...args);
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
