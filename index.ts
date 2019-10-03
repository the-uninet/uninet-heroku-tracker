const UninetAddress = require('uninet-address')

const wss = new (require('ws')).Server({ port: process.env.PORT })

const router = {}
function router_get(addr) {
  return router[addr.toString('base64')]
}
function router_add(addr, low_addr) {
  const a=addr.toString('base64')
  if(router[a] === void 0){
    router[a] = new Set()
  }
  router[a].add(low_addr)
}

wss.on('connection', ws => {
  ws.on('message', message => {
    message = JSON.parse(message)
  })
})
