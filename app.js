const express = require('express')
const app = express()
const port = 3000
const movieRouter = require('./routes/movieRoutes')

app.get('/', (_, res) => {
    res.send('server in funzione')
})

app.use('/api/movies', movieRouter)






app.listen(port, () => {
    console.log(port)
})