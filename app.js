const express = require('express')
const app = express()
const port = 3000
const connection = require('./data/db.js')




app.get('/api/movies', (req, res) => {
    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
})




app.listen(port, () => {
    console.log(port)
})