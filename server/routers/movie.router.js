const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
    // db query here
    const queryText = `SELECT * FROM movies`
    pool.query(queryText)
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            res.sendStatus(500);
        })
})

router.get('/:id', (req, res) => {
    console.log('hit movie details route');
    
    const queryText = `SELECT * FROM movies WHERE id=$1`
    pool.query(queryText, [req.params.id])
        .then( (result) => {
            console.log(result);
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log(error);
            
            res.sendStatus(500);
        })
})

module.exports = router;