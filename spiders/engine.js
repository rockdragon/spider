(function () {
    var fs = require('fs');
    var path = require('path');
    var child_process = require('child_process');
    var _ = require('underscore');
    var pathUtils = require('../modules/other/pathUtils');
    var Parent = require('../modules/scheduler/Parent');

    var directories = pathUtils.getSubDirectories(process.cwd());
    var modules = [];

    var cb = function (action) {
        var co = require('co');
        co(action).then(function(){
            var pid = process.pid;
            console.log('[%d] had been suicide.', pid);
            process.kill(pid);
        });
    };
    for (var i = 0, len = directories.length; i < len; i++) {
        var d = directories[i];
        var cityJS = path.join(d, 'city');
        if(fs.existsSync(cityJS + '.js'))
            modules.push({file: cityJS, method: 'fetchCities', callback: cb.toString()});
    }

    new Parent(modules, '../modules/scheduler/child').start();
})();