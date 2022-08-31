// Create WebSocket connection.
const socket = new WebSocket('ws://192.168.8.103:8080');

// Connection opened
socket.addEventListener('open', function (event) {
    console.log('Connected to WS Server')
    sendRegistration();
    buttons = document.getElementsByClassName('btn');
    [].forEach.call(buttons, function (button) { button.disabled = true; });
});

function updatePlayer() {
    player = document.getElementById("player").value;
    CLIENT_ID = player;
}

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);

    if (event.data === 'SERVER:START') {
        paused = false;
    };
    if (event.data === 'SERVER:PAUSE') {
        paused = true;
    };
    if (event.data === 'SERVER:PRACTICE') {
        console.log('prac');
        buttons = document.getElementsByClassName('btn');
        [].forEach.call(buttons, function (button) { button.disabled = !button.disabled; });
    };
    if (event.data === 'SERVER:RESET') {
        init();
        ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    };
    if (event.data === 'SERVER:BONUS') {
        bonus = true;
    };
    if (event.data === 'SERVER:HEART') {
        dots = dots + 3;
    };

    const cmd = event.data.split(":");
    if (cmd[0] === 'CLIENT' && cmd[1] === 'ID') {
        CLIENT_ID = cmd[2]
    };

});

// send message to server
const sendRegistration = () => {
    socket.send('CLIENT');
}


function UpdateServer() {
    const game2d = document.getElementById('myCanvas');
    const imgData = game2d.toDataURL('image/jpeg', 0.5);
    socket.send('CLIENT:UPDATE:' + CLIENT_ID + ':' + imgData);
}

function sendBonus(bonus_type) {
    console.log('CLIENT:BONUS:'+ CLIENT_ID + ':' + bonus_type);
    socket.send('CLIENT:BONUS:'+ CLIENT_ID + ':' + bonus_type);
}

window.addEventListener('beforeunload', (event) => {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Chrome requires returnValue to be set.
    event.returnValue = '';
});