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
        const Server = document.getElementById('p'+cmd[2]);
        Server.src =  image.src;
        return
    } 
    
    if (cmd[0] === 'CLIENT' && cmd[1] === 'BONUS') {
        // console.log('Message:', cmd[0] , cmd[1], cmd[2]);

        if (cmd[3] == 'BEER'){
            sendPause();
            alert('Player' + cmd[2] + ' got bonus, everyone else drink !');
        }
        
        if (cmd[3] == 'CAN'){
            sendPause();
            alert('Player' + cmd[2] + ' Pick a Live Player to takes a shot !');
        }
        
        if (cmd[3] == 'COOKIE'){
            sendPause();
            alert('Player' + cmd[2] + ' Quick last player to whistle takes a shot !');
        }
        
        if (cmd[3] == 'HEART'){
            sendHeart();
        }

        var image = new Image();
        return
    } 

        console.log('Message:', event.data);
    

});

const sendStart = () => {
    socket.send('SERVER:START');
}

const sendPause = () => {
    socket.send('SERVER:PAUSE');
}

const sendBonus = () => {
    socket.send('SERVER:BONUS');
}

const sendReset = () => {
    socket.send('SERVER:RESET');
}


const sendHeart = () => {
    socket.send('SERVER:HEART');
}

const sendPractice = () => {
    socket.send('SERVER:PRACTICE');
}



// const getBase64StringFromDataURL = (dataURL) =>
//     dataURL.replace('data:', '').replace(/^.+,/, '');
