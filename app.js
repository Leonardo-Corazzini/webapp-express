const express = require('express')
const app = express()
const port = 3000
const movieRouter = require('./routes/movieRoutes')
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler')

app.get('/', (_, res) => {
    res.send('server in funzione')
})

app.use('/api/movies', movieRouter)

app.use(errorHandler)
app.use(notFound)




app.listen(port, () => {
    console.log(port)
})