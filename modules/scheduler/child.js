function Child(jsFile, method, site, callback) {
    this.jsFile = jsFile;
    this.method = method;
    this.site = site;
    this.callback = eval('(' + callback + ')');
}

Child.prototype.work = function () {
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

