
require('http').createServer((req, res)=>{
  res.write('Hi')
  res.end()
}).listen(process.env.PORT)
