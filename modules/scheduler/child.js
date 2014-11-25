function Child(jsFile, method, callback) {
    this.jsFile = jsFile;
    this.method = method;
    this.callback = eval('(' + callback + ')');
    this.interval = 1000;
    this.livingSeconds = 10;
    this.stoppedTime = null;
}
var beatLoop = function (self) {
    setTimeout(function () {
        heartbeat(self);
    }, self.interval);
};

var stop = function () {
    process.send({category: 'stop'});
};

var heartbeat = function (self) {
    var msg = 'child-process is working';
    //process.send({category: 'heartbeat', 'message': msg});
    if (new Date() < self.stoppedTime)
        beatLoop(self);
    else
        stop();
};

Child.prototype.work = function () {
    this.stoppedTime = new Date(new Date().getTime() + this.livingSeconds * 1000);
    //beatLoop(this);
    var module = require(this.jsFile);
    var action = module[this.method];
    this.callback(action, process.pid);
};

//if (process.argv.length > 3) {
//    var jsFile = process.argv[2];
//    var method = process.argv[3];
//    var callback = process.argv[4];
//    var child = new Child(jsFile, method, callback);
//    child.work();
//}

process.on('message', function(m){
    if(m.category ==='init'){
        var child = new Child(m.task.file, m.task.method, m.task.callback);
        child.work();
    }
});