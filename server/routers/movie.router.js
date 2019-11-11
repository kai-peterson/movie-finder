const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
    // query db to grab all movies, order by id to ensure uniform order after PUTs
    const queryText = `SELECT * FROM movies ORDER BY id`
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
    // get details from a movie at a specific id (passed from image onClick -> saga -> here)
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

router.get('/genre/:id', (req, res) => {
    console.log('hit movie details GENRE route');
    // query db to grab all genres associated with a specific movie id
    const queryText = `SELECT genres.name FROM movies 
                        JOIN movies_genres_junction ON movies.id=movies_genres_junction."movie-id" 
                        JOIN genres ON movies_genres_junction."genre-id"=genres.id 
                        WHERE movies.id=$1 
                        GROUP BY genres.name`
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

router.put('/:id', (req, res) => {
    console.log('hit movie details PUT route. id:', req.params.id, req.body);
    // update movie details in table based on info (passed from inputs in /details -> saga -> here
    const queryText = `UPDATE movies SET title=$1, description=$2 WHERE id=$3`
    pool.query(queryText, [req.body.title, req.body.description, req.params.id])
        .then( (result) => {
            res.sendStatus(200)
        })
        .catch( (error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;