const connection = require('../data/db.js')

function index(_, res) {


    let sql = `SELECT * FROM movies`

    connection.query(sql, (err, movies) => {
        if (err) return res.status(500).json({ message: err.message })
        movies.forEach((movie) => {
            movie.image = `http://localhost:3000/${movie.image}`
        })
        res.json(movies)
    })


}


function show(req, res) {
    const id = req.params.id

    const sql = `SELECT movies.*, AVG(vote) AS avg_vote 
		FROM movies
		JOIN reviews
		ON movies.id = reviews.movie_id 
		WHERE movies.id = ?
		GROUP BY movies.id`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        if (results.length === 0)
            return res.status(404).json({
                error: 'Not Found',
                message: 'Movie not found',
            })

        const movie = results[0]
        movie.image = `http://localhost:3000/${movie.image}`

        const sql = `SELECT * FROM reviews WHERE movie_id = ?`

        connection.query(sql, [id], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })

            movie.reviews = results
            res.json(movie)
        })
    })
}

function storeReview(req, res) {
    const id = req.params.id
    const { text, vote, name } = req.body

    console.log(id, text, vote, name)
    const sql =
        'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)'

    connection.query(sql, [text, name, vote, id], (err) => {
        if (err) return res.status(500).json({ message: err })
        res.status(201).json({ message: 'Review added' })
    })
}
module.exports = { index, show, storeReview }