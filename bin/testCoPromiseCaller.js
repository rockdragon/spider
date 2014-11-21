var testReturn = require('./testCoPromise');

testCoPromise.read('config.cfg')
    .then(function (res) {
        console.log(res);
    }, onErrror);

function onError(e){
    console.log(e.stack);
}

