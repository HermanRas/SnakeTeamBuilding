function UpdateServer() {
    // const Game = document.getElementById('myCanvas');
    // const Server = document.getElementById('myCanvas2Server');
    // const destCtx = Server.getContext('2d');
    // destCtx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    // destCtx.drawImage(Game, 0, 0);
}

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', function (event) {
    console.log('Connected to WS Server')
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message:', event.data);
});

const sendStart = () => {
    socket.send('SERVER:START');
}

const sendPause = () => {
    socket.send('SERVER:PAUSE');
}

const sendBobus = () => {
    socket.send('SERVER:BONUS');
}

const sendReset = () => {
    socket.send('SERVER:RESET');
}
