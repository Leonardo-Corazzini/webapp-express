const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('server accesso')
})




app.listen(port, () => {
    console.log(port)
})