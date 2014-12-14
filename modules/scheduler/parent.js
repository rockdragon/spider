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
    this.next();
};

Parent.prototype.next = function () {
    //console.log('waiting', this.taskWaiting, 'working', this.taskWorking);
    if (this.taskWaiting.length > 0) {
        if (this.taskWorking.length < cores) {
            for (var i = 0, len = cores - this.taskWorking.length; i < len; i++) {
                var task = this.taskWaiting.splice(0, 1)[0];
                this.execute(task);
            }
        }
    }
};

Parent.prototype.execute = function (task) {
    if (task) {
        var parent = this;
        var child = child_process.fork(this.child);
        this.taskWorking.push(child);
        child.on('message', function (m) {
            console.log(m);
        });
        child.on('exit', function () {
            parent.taskWorking.remove(child);
            parent.next();
        });
        child.send({category: 'init', task: task});
    }
};

//new Parent().start();



