const connection = require('../data/db.js')


function index(_, res) {


    let sql = `SELECT * FROM movies`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: err.message })

        res.json(results)
    })
}


module.exports = { index }