new (require('uninet-websocket')).Server({
  listening_port:process.env.PORT,
  url:"wss://"+process.env.DOMAIN
})
