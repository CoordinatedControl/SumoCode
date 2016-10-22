var sumo = require('node-sumo');

var drone = sumo.createClient();

drone.connect(function() {
    console.log('Connected');
    drone.postureJumper();

    var interval = setInterval(function() {
        drone.right(50);
        setTimeout(function() {
            drone.forward(10);
        }, 315);
    }, 2200);

    setTimeout(function() {
        clearInterval(interval);
        drone.stop();
    }, 20000);
});
