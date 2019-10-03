#!/usr/bin/env node

require('http').createServer((req, res)=>{
  res.write('Hi')
  res.end()
}).listen(80)
