const express = require('express')
const app = express()

var path = require('path');

app.get('/', (req, res) => {
    // res.send("Hello World");
    res.sendFile(path.join(__dirname, 'website.html'))
})

app.post('/',(req,res)=>{
    res.send("HELLO")
    authorize()
})


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
console.log(`Example app listening at http://localhost:${PORT}`)
})    