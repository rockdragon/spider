var interval = 1000;

function heartbeat() {
    var msg = 'child-process is working';
    process.send(msg);
    beatLoop();
}
function beatLoop(){
    setTimeout(heartbeat, interval);
}

function work() {
    beatLoop();
}

work();