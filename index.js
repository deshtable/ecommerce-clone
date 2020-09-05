const express = require('express')
const apiTest = require('./apitest')

const app = express()
app.use(express.static('client'))

app.use(express.json());
var path = require('path');

app.get('/', (req, res) => {
    // res.send("Hello World");
    res.sendFile(path.join(__dirname, 'client', 'website.html'))
})

app.post('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'client', 'website.html'))
    console.log("hello world")
    apiTest.runApi(req.body.number +' ' + req.body.name)
    console.log(req.body)
})


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
console.log(`Example app listening at http://localhost:${PORT}`)
})    