const net  = require("net")
const fs =  require("node:fs/promises")
const server = net.createServer(()=>{

})

server.on("connection", (socket)=>{
    console.log("New connection")


    socket.on("data", async (data)=>{

        const fileHanlde =  await fs.open("/storage/text.txt");
        const fileStream = fileHanlde.createWriteStream()
        fileStream.write(data)
        
    })

})


server.listen(5050, "::1", ()=>{
    console.log("Uploader server is running on ", server.address())
})