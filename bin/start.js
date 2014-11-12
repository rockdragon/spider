(function () {
    var fs = require('fs');
    var run = require('../modules/es6/container.js').run;

    var readFile = function (dir) {
        return function (fn) {
            fs.readFile(dir, {encoding: 'utf8', flag: 'r'}, fn);
        };
    };

    run(function *(cb) {
        console.log('first');
        var res = yield readFile('config.cfg')(cb);
        console.log(res);
    });
})();