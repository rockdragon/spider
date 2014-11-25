(function () {
    var fs = require('fs');
    var path = require('path');
    var child_process = require('child_process');
    var _ = require('underscore');
    var pathUtils = require('../modules/other/pathUtils');
    var Parent = require('../modules/scheduler/Parent');

    var dirs = pathUtils.getSubDirectories(process.cwd());
    var modules = [];

    var cb = function (action) {
        var co = require('co');
        return co(function *() {
            var logUtils = '../logger/logUtils';
            require(logUtils).log(yield action());
            var pid = process.pid;
            setTimeout(function(){
                console.log('killing [%d]', pid);
                process.kill(pid); // kill self
            }, 1000);
        });
    };
    for (var i = 0, len = dirs.length; i < len; i++) {
        var d = dirs[i];
        var listJS = path.join(d, 'list');
        if(fs.existsSync(listJS + '.js'))
            modules.push({file: listJS, method: 'getHouses', callback: cb.toString()});
    }

    new Parent(modules, '../modules/scheduler/child').start();
})();