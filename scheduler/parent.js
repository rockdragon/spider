var cpus = require('os').cpus().length;
var child_process = require('child_process');
var taskWaiting = ['./child'];
var taskWorking = [];

Array.prototype.remove = function (ele) {
    var index = -1;
    for (var j = 0, len = this.length; j < len; j++) {
        if(this[j] == ele)
            index = j;
    }
    return index > -1 ? this.splice(index, 1) : null;
};

function start() {
    while (taskWaiting.length > 0) {
        if (taskWorking.length < cpus) {
            var task = taskWaiting.splice(0, 1)[0];
            execute(task);
        }
    }
}

function stop(child) {
    console.log('[%d] : stopped.', child.pid);
    var task = taskWorking.remove(child);
    console.log(task);
    if(task){
        process.kill(task.pid);
    }
}

function execute(task) {
    if (task) {
        var child = child_process.fork(task);
        taskWorking.push(child);
        child.on('message', function (m) {
            if (m.category === 'heartbeat')
                console.log('[%d] : [%s] ', child.pid, m.message);
            else if (m.category === 'stop') {
                //stop(child);
            }
        });
    }
}

start();



