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
  Servers,
  GetServers,
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
    const type: PacketType = msg[0]
    throw 'WIP'
    if(type===PacketType.Servers){

    }else if(type===PacketType.GetServers){

    }else if(type===PacketType.RoutingTable){

    }else if(type===PacketType.GetRoutingTable){

    }else if(type===PacketType.ProxyMe){

    }else if(type===PacketType.Packet){

    }else{
      assert(false)
    }
  })
})
