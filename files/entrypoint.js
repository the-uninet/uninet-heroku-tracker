require('uninet-websocket').new_server(process.env.PORT, "wss://"+process.env.DOMAIN)
