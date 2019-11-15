const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')
const axios = require('axios')

router.get('/', (req, res) => {
    // query db to grab all movies, order by id to ensure uniform order after PUTs
    const queryText = `SELECT * FROM movies ORDER BY id`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

router.get('/:id', (req, res) => {
    console.log('hit movie details route');
    // get details from a movie at a specific id (passed from image onClick -> saga -> here)
    const queryText = `SELECT * FROM movies WHERE id=$1`
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log(result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error in api server', error);

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
        .then((result) => {
            console.log(result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(error);

            res.sendStatus(500);
        })
})

router.get('/tmdb/api/:query', (req, res) => {
    // console.log('hit api route', req.params.query);

    axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {
            api_key: process.env.TMDB_API_KEY,
            query: req.params.query,
            include_adult: false,
        }
    })
        .then((result) => {
            // console.log(result.data.results);
            res.send(result.data.results)
        })
        .catch((error) => res.sendStatus(500)
        )
})

router.post('/tmdb/details', (req, res) => {
    console.log('hit api details route', req.body);

    axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${req.body.id}`,
        params: {
            api_key: process.env.TMDB_API_KEY
        }
    })
        .then((result) => {
            console.log('THESE ARE THE RESULT FOR ONE MOVIE', result.data);
            const genres = result.data.genres.map((genreObject) => genreObject.name);
            const insertQueryText = `INSERT INTO movies(title, poster, description) VALUES($1, $2, $3) RETURNING id`;
            const queryParams = [result.data.title, 'https://image.tmdb.org/t/p/w300' + result.data.poster_path, result.data.overview];
            pool.query(insertQueryText, queryParams)
                .then((result) => {
                    const newMovieId = result.rows[0].id;
                    // console.log(newMovieId);
                    // console.log('THIS IS THE DATA IN NESTED QUERY', result.data);
                    genres.forEach((genre) => {
                        pool.query('SELECT * FROM genres WHERE name=$1', [genre])
                            .then((result) => {
                                // console.log('CURRENT DATA IM WORKING WITH', result);
                                if (result.rows.length > 0) {
                                    const genreId = result.rows[0].id;
                                    pool.query(`INSERT INTO movies_genres_junction("movie-id", "genre-id") VALUES($1, $2)`, [newMovieId, genreId])
                                }
                                else {
                                    pool.query(`INSERT INTO genres(name) VALUES($1) RETURNING id`, [genre])
                                        .then((result) => {
                                            const newGenreId = result.rows[0].id
                                            pool.query(`INSERT INTO movies_genres_junction("movie-id", "genre-id") VALUES($1, $2)`, [newMovieId, newGenreId])
                                        })
                                }
                            })
                    })
                })
        })
})
// res.send(result)

router.put('/:id', (req, res) => {
    console.log('hit movie details PUT route. id:', req.params.id, req.body);
    // update movie details in table based on info (passed from inputs in /details -> saga -> here
    const queryText = `UPDATE movies SET title=$1, description=$2 WHERE id=$3`
    pool.query(queryText, [req.body.title, req.body.description, req.params.id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;