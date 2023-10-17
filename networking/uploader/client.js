const net = require("net")
const fs =  require("node:fs/promises");
const path = require("path");

// let fileHanlde, fileStream;
const clearLine = (direction)=>{

    return new Promise((resolve, reject)=>{

        process.stdout.clearLine(direction,()=>{
            resolve()
        })
    })
}


const moveCursor = (dx, dy) =>{
    return new Promise((resolve, reject)=>{
        process.stdout.moveCursor(dx, dy, ()=>{
            resolve()
        })
    })
}


const socket = net.createConnection(
    {host:"::1", port:5050},
    async ()=>{

        const filePath =  process.argv[2]
        const fileName = path.basename(filePath)
        const fileHanlde = await fs.open(filePath, "r")
        const fileStream = fileHanlde.createReadStream()
        const fileSize = (await fileHanlde.stat()).size

        let uploadedPercentage = 0
        let bytesUploaded = 0

         socket.write(`filename: ${fileName}-------`)
        // reading from source file
        fileStream.on("data", async (data)=>{
            if (!socket.write(data)){
                fileStream.pause()
            }
            bytesUploaded += data.length

            let newPercentage = Math.floor((bytesUploaded / fileSize) * 100)

            if (newPercentage != uploadedPercentage){
                uploadedPercentage = newPercentage
               await moveCursor(0, -1)
               await clearLine(0)
                console.log(`Uploading...${uploadedPercentage}%`)
            }
        })

        socket.on("drain",()=>{
            fileStream.resume()
        })
        fileStream.on("end", ()=>{

            console.log("File successully uploadded!")

            socket.end()
        })

    }
)





