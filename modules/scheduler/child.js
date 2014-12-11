function Child(jsFile, method, site, callback) {
    this.jsFile = jsFile;
    this.method = method;
    this.site = site;
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
    console.log(this.site);
    this.callback(action, this.site);
};

process.on('message', function (m) {
    if (m.category === 'init') {
        var child = new Child(m.task.file, m.task.method, m.task.site, m.task.callback);
        child.work();
    }
});