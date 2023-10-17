const net  = require("net")
const fs =  require("node:fs/promises")
const server = net.createServer(()=>{})
const path = require("path")

server.on("connection", (socket)=>{
    let fileHanlde, fileStream;
    console.log("New connection")


    socket.on("data", async (data)=>{

        if (!fileHanlde)
        {
            socket.pause() // stop recieving buffer from the client

            const indexOfDivider = data.indexOf("-------")
            const fileName = data.subarray(10, indexOfDivider)

            fileHanlde =  await fs.open(`storage/${fileName}`, "w");
            fileStream = fileHanlde.createWriteStream()

           // writing to destination file discard the headers
           fileStream.write(data.subarray(indexOfDivider + 7))

            socket.resume() // start receiving from the client
           fileStream.on("drain", ()=>{
            socket.resume()
           })
        }else {socket
            if (!fileStream.write(data)){
                socket.pause()
            }
        }
        
    })

    socket.on("end",()=>{
        fileHanlde.close()
        console.log("Connection ended")
        fileHanlde = undefined
        fileStream = undefined
    })

})


server.listen(5050, "::1", ()=>{
    console.log("Uploader server is running on ", server.address())
})