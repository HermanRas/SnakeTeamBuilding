// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

let p1 = new Image();
let p2 = new Image();
let p3 = new Image();
let p4 = new Image();
let p5 = new Image();
let p6 = new Image();
let p7 = new Image();
let p8 = new Image();

// Connection opened
socket.addEventListener('open', function (event) {
    console.log('Connected to WS Server')
    socket.send('SERVER:SET');
});

// Listen for messages
socket.addEventListener('message', function (event) {

    // if visual update
    const cmd = event.data.split(":");
    if (cmd[0] === 'CLIENT' && cmd[1] === 'UPDATE') {
        // console.log('Message:', cmd[0] , cmd[1], cmd[2]);

        var image = new Image();
        image.src = (cmd[3] + ":" + cmd[4]);
        const Server = document.getElementById('p' + cmd[2]);
        Server.src = image.src;
        return;
    }

    if (cmd[0] === 'CLIENT' && cmd[1] === 'BONUS') {
        if (cmd[3] == 'BEER') {
            sendPause();
            alert('Player' + cmd[2] + ' got lollipop, everyone gets a sweetie !');
        }

        if (cmd[3] == 'CAN') {
            sendPause();
            alert('Player' + cmd[2] + ' got bonus,' + cmd[2] + ' Pick a Live Player to eat a worm !');
        }

        if (cmd[3] == 'COOKIE') {
            sendPause();
            alert('Player' + cmd[2] + ' got bonus, everyone else Quick last player to whistle eats a worm !');
        }

        if (cmd[3] == 'HEART') {
            sendHeart();
        }

        var image = new Image();
        return
    }

    // console.log('Message:', event.data);


});

const sendStart = () => {
    socket.send('SERVER:START');
}

const sendPause = () => {
    socket.send('SERVER:PAUSE');
    countDownDate = countDownDate + (1000 * 60);
}

const sendBonus = () => {
    socket.send('SERVER:BONUS');
    var x = Math.floor(Math.random() * 120);
    countDownDate = new Date().getTime() + (x * 1000);
}

const sendReset = () => {
    socket.send('SERVER:RESET');
}

const sendHeart = () => {
    socket.send('SERVER:HEART');
    countDownDate = countDownDate + (1000 * 60);
}

const sendPractice = () => {
    socket.send('SERVER:PRACTICE');
}

// Set the date we're counting down to
var countDownDate = new Date().getTime() + (1000 * 60);
// Update the count down every 1 second
var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // Display the result in the element with id="timer"
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
    // If the count down is finished, write some text
    if (distance < 0) {
        sendBonus();
        document.getElementById("timer").innerHTML = "BONUS !";
    }
}, 1000);