const net = require("net")
const readline = require("readline/promises")


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


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

const ask = async () =>{

    const message = await rl.question("Enter a message> ")
    // move cursor 1 line up
    await  moveCursor(0, -1)
    await clearLine(0)
    socket.write(message)
}
const socket =  net.createConnection(
{port:"3000", host:"127.0.0.1"},
async()=>{
    console.log("Connected to the server!")


    ask()

})
socket.on("data", async (data)=>{

    console.log()
    await moveCursor(0, -1)
    await clearLine(0)
    console.log(data.toString("utf-8"))
    ask()
})

socket.on("end",()=>{
    console.log("Connected was ended")
})