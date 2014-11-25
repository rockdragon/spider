(function () {
    var fs = require('fs');
    var path = require('path');
    var child_process = require('child_process');
    var _ = require('underscore');
    var pathUtils = require('../modules/other/pathUtils');
    var Parent = require('../modules/scheduler/Parent');

    var dirs = pathUtils.getSubDirectories(process.cwd());
    var modules = [];

    var cb = function (action, pid) {
        var co = require('co');
        return co(function *() {
            console.log(yield action());
            process.kill(pid);
        });
    };
    for (var i = 0, len = dirs.length; i < len; i++) {
        var d = dirs[i];
        var listJS = path.join(d, 'list');
        modules.push({file: listJS, method: 'getHouses', callback: cb.toString()});
    }

    new Parent(modules, '../modules/scheduler/child').start();
})();