// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

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
        const Server = document.getElementById('p' + cmd[2]);
        const destCtx = Server.getContext('2d');

        var image = new Image();
        image.src = (cmd[3] + ":" + cmd[4]);
        
        destCtx.clearRect(0, 0, 300, 300);
        destCtx.drawImage(image, 0, 0);
    }else{
        console.log('Message:', event.data);
    }

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

