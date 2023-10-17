const dns = require("node:dns/promises");



(async ()=>{
    const result = await dns.lookup("vercel.com")
    console.log(result)
})()