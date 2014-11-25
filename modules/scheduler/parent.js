var cores = require('os').cpus().length;
var child_process = require('child_process');

Array.prototype.remove = function (ele) {
    var index = -1;
    for (var j = 0, len = this.length; j < len; j++) {
        if (this[j] == ele)
            index = j;
    }
    return index > -1 ? this.splice(index, 1) : null;
};

module.exports = Parent;

function Parent(args, childPath) {
    this.child = childPath;
    this.taskWaiting = args || [];
    this.taskWorking = [];
}

Parent.prototype.start = function () {
    while (this.taskWaiting.length > 0) {
        if (this.taskWorking.length < cores) {
            var task = this.taskWaiting.splice(0, 1)[0];
            this.execute(task);
        }
    }
};

Parent.prototype.stop = function (child) {
    console.log('[%d] : stopped.', child.pid);
    var task = this.taskWorking.remove(child);
    console.log(task);
    if (task) {
        process.kill(task.pid);
    }
};

Parent.prototype.execute = function (task) {
    if (task) {
        var child = child_process.fork(this.child);
        this.taskWorking.push(child);
        child.on('message', function (m) {
            if (m.category === 'heartbeat')
                console.log('[%d] : [%s] ', child.pid, m.message);
            else if (m.category === 'result') {
                console.log(m.message);
            }
        });
        child.send({category:'init', task:task});
    }
};

//new Parent().start();



