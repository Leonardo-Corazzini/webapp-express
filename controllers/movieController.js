const connection = require('../data/db.js')


function index(_, res) {


    let sql = `SELECT * FROM movies`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message })

        res.json(results)
    })
}


function show(req, res) {
    const id = req.params.id

    const sql = `SELECT * FROM movies WHERE id = ?`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        if (results.length === 0)
            return res.status(404).json({
                error: 'Not Found',
                message: 'Movie not found',
            })

        const movie = results[0]

        const sql = `SELECT * FROM reviews WHERE movie_id = ?`

        connection.query(sql, [id], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })

            movie.reviews = results
            res.json(movie)
        })
    })
}

module.exports = { index, show }