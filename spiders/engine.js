require('co')(function* () {
    var fs = require('fs');
    var path = require('path');
    var child_process = require('child_process');
    var _ = require('underscore');
    var getAbsolutePath = require('../modules/other/pathUtils').getAbsolutePath;
    var pathUtils = require(getAbsolutePath('modules/other/pathUtils'));
    var Parent = require(getAbsolutePath('modules/scheduler/Parent'));
    var model = require(getAbsolutePath('spiders/model'));
    var onSuccess = require(getAbsolutePath('spiders/biz')).onSuccess;

    var directories = pathUtils.getSubDirectories(getAbsolutePath('spiders'));
    var modules = [];

    var cb = function (action) {
        var co = require('co');
        co(action(10)).then(function () { // suicidal-ending for the child-process callback
            var pid = process.pid;
            console.log('[%d] had been suicide.', pid);
            process.kill(pid);
        }, function (err) {
            console.log(err.stack);
        });
    };
    for (var i = 0, len = directories.length; i < len; i++) {
        var d = directories[i];
        var cityJS = path.join(d, 'city');
        if (fs.existsSync(cityJS + '.js'))
            modules.push({file: cityJS, method: 'fetchCities', callback: cb.toString()});
    }

    yield model.synchronize();
    onSuccess('synchronization successfully.');

    new Parent(modules, getAbsolutePath('modules/scheduler/child')).start();
});