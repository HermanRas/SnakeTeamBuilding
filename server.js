const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: server });

wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  ws.send('Welcome New Client!');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

  });
});

app.get('/', (req, res) => {
  res.send(
    'Hello World of web sockets!'
  )
})

app.use(express.static('public'))

// app.get('/snake', (req, res) => {
//   res.writeHead(200, { 'content-type': 'text/html' })
//   fs.createReadStream('./snake.html').pipe(res)
// })


server.listen(8080, () => console.log(`Lisening on port :8080`))