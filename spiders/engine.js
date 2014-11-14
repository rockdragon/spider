(function () {
    var fs = require('fs');
    var path = require('path');
    var child_process = require('child_process');
    var _ = require('underscore');
    var pathUtils = require('../modules/other/pathUtils');
    var run = require('../modules/es6/container.js').run;

    run(function*(cb) {
        var dirs = pathUtils.getSubDirectories(process.cwd());
        for (var i = 0, len = dirs.length; i < len; i++) {
            var d = dirs[i];
            var listJS = path.join(d, 'list');
            //console.log('fork ', listJS, '...');
            //child_process.fork(listJS);
            console.log('require ', listJS, '...');
            var getHouses = require(listJS).getHouses;
            var houses = yield getHouses()(cb);
            console.log(d, houses);
        }
    });

})();