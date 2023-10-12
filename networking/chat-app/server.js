const net = require("net")

const server = net.createServer()

// an array containing all the sockets of the connected clients
const clients = []
server.on("connection", async (socket)=>{

    socket.on("data", (data)=>{

        clients.map(s=>{
            s.write(data)
        })
    })


    clients.push(socket)


})



server.listen(3000, "127.0.0.1",()=>{
    console.log("server is listening on port: ", server.address())
})