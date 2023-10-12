const http = require("http");

const port = 4000;
const hostname = "127.0.0.1";
const server = http.createServer((req, res)=>{

    const data = {message:"Hello world"};

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Connection", "close");
    res.statusCode = 200; 
    res.end(JSON.stringify(data))
})


server.listen(port,hostname,()=>{
    console.log(`server is runnong on port ${port} ...`)
});