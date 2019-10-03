const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: process.env.PORT })

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('received: %s', message)
  })

  ws.send('something');
})
