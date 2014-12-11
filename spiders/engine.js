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

    var dirNames = pathUtils.getSubDirNames(getAbsolutePath('spiders'));
    var modules = [];

    var cb = function (action, site) {
        var co = require('co');
        co(action(site)).then(function () { // suicidal-ending for the child-process callback
            var pid = process.pid;
            console.log('[%d] had been suicide.', pid);
            process.kill(pid);
        }, function (err) {
            console.log(err.stack);
        });
    };
    var crawlCitiesJS = getAbsolutePath('spiders/crawlCities');
    for (var i = 0, len = dirNames.length; i < len; i++) {
        var site = dirNames[i];
        modules.push({file: crawlCitiesJS, method: 'fetchCities', site: site, callback: cb.toString()});
    }

    yield model.synchronize();
    onSuccess('synchronization successfully.');

    new Parent([modules[2]], getAbsolutePath('modules/scheduler/child')).start();
});