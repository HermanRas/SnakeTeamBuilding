// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', function (event) {
    console.log('Connected to WS Server')
    sendRegistration();
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);

    if (event.data === 'SERVER:START') {
        paused = false;
    };
    if (event.data === 'SERVER:PAUSE') {
        paused = true;
    };
    if (event.data === 'SERVER:BONUS') {

    };
    if (event.data === 'SERVER:RESET') {
        init();
        ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    };
    if (event.data === 'SERVER:BONUS') {

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

const sendMessage = () => {
    socket.send('Hello From Client1!');
}