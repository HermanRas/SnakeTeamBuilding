const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: server });

let ws_server;
let ws_Server_log = '';
let ws_server_add = ''

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  ws_server_add = add;
  console.log('SERVER_ADDR: ' + add);
  updateServerLog('CONSOLE', 'SERVER_ADDR: ' + add);
})

wss.on('connection', function connection(ws) {
  // new connections
  updateServerLog('CONSOLE', 'A new connection Connected!');
  updateServerLog('CONSOLE', 'Welcome to the server!');
  ws.send('Welcome to the server!');

  // incomming action
  ws.on('message', function incoming(message) {
    console.log('received:', message);

    //////////////////////////////////////////////////////////////////////////
    // SERVER ACTIONS 
    //////////////////////////////////////////////////////////////////////////
    if (message === 'SERVER:SET') {
      updateServerLog('SERVER ', message);
      updateServerLog('CONSOLE', 'Setting up connection to Server.');
      ws_server = ws;
    }

    if (message === 'SERVER:START') {
      updateServerLog('SERVER ', message);
      updateServerLog('CONSOLE', 'Sarting all snakes.');
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send('SERVER:START');
        }
      });
    }

    if (message === 'SERVER:PAUSE') {
      updateServerLog('SERVER ', message);
      updateServerLog('CONSOLE', 'Pausing all snakes.');
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send('SERVER:PAUSE');
        }
      });
    }

    if (message === 'SERVER:BONUS') {
      updateServerLog('SERVER ', message);
      updateServerLog('CONSOLE', 'Sending a BONUS to all snakes.');
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send('SERVER:BONUS');
        }
      });
    }

    if (message === 'SERVER:RESET') {
      updateServerLog('SERVER ', message);
      updateServerLog('CONSOLE', 'Sending a RESET to all snakes.');
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send('SERVER:RESET');
        }
      });
    }

    if (message === 'SERVER:PRACTICE') {
      updateServerLog('SERVER ', message);
      updateServerLog('CONSOLE', 'Sending a PRACTICE to all snakes.');
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send('SERVER:PRACTICE');
        }
      });
    }

    if (message === 'SERVER:HEART') {
      updateServerLog('SERVER ', message);
      updateServerLog('CONSOLE', 'Sending a HEART to all snakes.');
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send('SERVER:HEART');
        }
      });
    }

    //////////////////////////////////////////////////////////////////////////
    // CLIENT ACTIONS 
    //////////////////////////////////////////////////////////////////////////

    if (message === 'CLIENT') {
      updateServerLog('CLIENT ', 'registering ' + message + (wss.clients.size - 1));
      updateServerLog('CONSOLE', 'Pausing all snakes.');
      wss.clients.forEach(function each(client) {
        if (client == ws && client.readyState === WebSocket.OPEN) {
          // recomended client can update
          client.send('CLIENT:ID:' + (wss.clients.size - 1));
        }
      });
    }

    if (message === 'CLIENT:PAUSE') {
      updateServerLog('CLIENT ', message);
      updateServerLog('CONSOLE', 'Pausing all snakes.');
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send('SERVER:PAUSE');
        }
      });
    }

    const cmd = message.split(":");

    if (cmd[0] === 'CLIENT' && cmd[1] === 'UPDATE') {
      wss.clients.forEach(function each(client) {
        if (client == ws_server && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
    if (cmd[0] === 'CLIENT' && cmd[1] === 'BONUS') {
      wss.clients.forEach(function each(client) {
        if (client == ws_server && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }


  });
});

app.get('/', (req, res) => {
  res.send(
    '<h1>Welcome to snake CONSOLE!</h1>' +
    '<br><a href="snake.html" target="_blank">Join the Game</a>' +
    '<br><a href="snakeManager.html" target="_blank">Setup Server</a>' +
    '<div style="border:box;">' + ws_Server_log + '</div>'
  )
})

function updateServerLog(ws, NewLine) {
  ws_Server_log = ws_Server_log + '<br>' + ws + ': ' + NewLine;
}

var fs = require('fs')
fs.readFile('public/snake_ws_client.js.tmp', 'utf8', function (err, data) {
  if (err) {
    updateServerLog('CONSOLE', err);
    return console.log(err);
  }
  console.log(ws_server_add);
  var result = data.replace(/localhost/g, ws_server_add);
  updateServerLog('CONSOLE', 'Updating client file with server address: ' + ws_server_add);
  fs.writeFile('public/snake_ws_client.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

app.use(express.static('public'))
server.listen(8080, () => console.log(`Lisening on port :8080`))