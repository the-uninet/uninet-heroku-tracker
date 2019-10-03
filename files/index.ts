const UninetAddress = require('uninet-address')
const assert = require('assert').strict
const websocket = require('ws')

const enum PacketType {
  Servers,
  GetServers,
  RoutingTable,
  GetRoutingTable,
  ProxyMe,
  Packet,
}

type LowAddressStr = string
type LowAddress = ["ws",string] | ["wss",string]

function LowAddressStr2LowAddress(x:LowAddressStr):LowAddress{
  if(x.startsWith("ws://")){
    return ["ws", x.slice(5)]
  }
  assert(x.startsWith("wss://"))
  return ["wss", x.slice(6)]
}

const router: { [k: string]: Set<LowAddressStr> } = {}
function router_get(addr:string):Set<LowAddressStr>|undefined {
  return router[addr]
}
function router_add(addr:string, low_addr:LowAddressStr):void {
  if(router[addr] === void 0){
    router[addr] = new Set()
  }
  router[addr].add(low_addr)
}

const other_servers: Set<LowAddressStr> = new Set()

new websocket.Server({ port: process.env.PORT }).on('connection', ws => {
  ws.on('message', raw_msg => (async function () {
    const msg:any = JSON.parse(raw_msg)
    assert(Array.isArray(msg) && msg.length>0)
    const type: PacketType = msg[0]
    if(type===PacketType.Servers){
      assert(msg.length===2 && Array.isArray(msg[1]))
      for(const x of msg[1]){
        assert(Array.isArray(x) && x.length===2 && (x[0]==='ws' || x[0]==='wss') && typeof x[1] === 'string')
        const addr:LowAddressStr=`${x[0]}://${x[1]}`
        console.log(`Servers add ${addr}`)
        other_servers.add(addr)
      }
    }else if(type===PacketType.GetServers){
      assert(msg.length===1)
      const result:Array<LowAddress>=[]
      other_servers.forEach(x=>result.push(LowAddressStr2LowAddress(x)))
      ws.send(JSON.stringify([PacketType.Servers, result]))
    }else if(type===PacketType.RoutingTable){
      throw 'WIP'
    }else if(type===PacketType.GetRoutingTable){
      throw 'WIP'
    }else if(type===PacketType.ProxyMe){
      throw 'WIP'
    }else if(type===PacketType.Packet){
      throw 'WIP'
    }else{
      assert(false)
    }
  })().catch(e=>console.error(e)))
})
