var cpus = require('os').cpus().length;
var child_process = require('child_process');
var taskWaiting = ['./child'];
var taskWorking = [];

function start() {
    while (taskWaiting.length > 0) {
        if (taskWorking.length < cpus) {
            var task = taskWaiting.splice(0, 1)[0];
            execute(task);
        }
    }
}

function stopAll() {
    while (taskWorking.length) {
        var task = taskWorking.splice(0, 1)[0];
        task.kill();
    }
}

function execute(task) {
    if (task) {
        var child = child_process.fork(task);
        taskWorking.push(child);
        child.on('message', function (m) {
            console.log('Received [%s] from [%d]', JSON.stringify(m), child.pid);
        });
    }
}

start();

setTimeout(function () {
    stopAll();
}, 10000);


