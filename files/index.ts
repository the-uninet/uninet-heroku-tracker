const UninetAddress = require('uninet-address')
const assert = require('assert').strict

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

const enum PacketType {
  RoutingTable,
  GetRoutingTable,
  ProxyMe,
  Packet,
}

wss.on('connection', ws => {
  ws.on('message', msg => {
    msg = JSON.parse(msg)
    assert(Array.isArray(msg))
    assert(msg.length>0)
    assert.equal(typeof msg[0], 'string')
  })
})
