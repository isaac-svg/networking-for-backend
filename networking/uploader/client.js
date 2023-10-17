const net = require("net")
const fs =  require("node:fs/promises")



const socket = net.createConnection(
    {host:"::1", port:5050}
)





