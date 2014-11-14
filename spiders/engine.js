(function(){
    var fs = require('fs');
    var path = require('path');
    var _ = require('underscore');
    var pathUtils = require('../modules/other/pathUtils')

    var dirs = pathUtils.getSubDirectories(process.cwd());
    console.log(dirs);
})();