const net = require("net")

const server = net.createServer()

// an array containing all the sockets of the connected clients
const clients = []
server.on("connection", async (socket)=>{

    const clientId = clients.length +  1

    socket.write(`id-${clientId}`)

    socket.on("data", (data)=>{

        const dataString = data.toString("utf-8")
        const id = dataString.substring(0, dataString.indexOf("-"))
        const message = dataString.substring(dataString.lastIndexOf("-") + 1)

        clients.map(client=>{
            client.socket.write(`> User ${id}: ${message}`)
        })
    })


    clients.push({id:clientId.toString(), socket})


})



server.listen(3000, "127.0.0.1",()=>{
    console.log("server is listening on port: ", server.address())
})