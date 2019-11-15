# Project Name

Movie Finder with API

Deployed site: https://movie-details-finder.herokuapp.com/
- Click the link above for a fully-functional version of the app


## Description

Built a functional movie finder that lets you search movies from a database and add them to your list. Click on a movie for more details including genres. Edit movie title and description on details page. This project also uses three tables in the database, including a junction table for movies and genres. 

I'm most proud of my post route (movie.router.js - line 76) that makes a request to the API, inserts movie into table, add genres to the genre table if they aren't already there, then insert all a row for each genre into junction table for the new movie.

Features:
- View list of movies
- Show more and Show less buttons for description
- Details page with genres
- Edit title/description on details page
- Search movies using API
- Add new movies to list, including genres
- Adding new genres to database before inserting necessary rows into junction table

## Screen Shots

[Image: Main list view](https://imgur.com/TvTsjzF) <br />
[Image: Search modal results](https://imgur.com/mqnVs7E) <br />
[Image: Add movie from modal](https://imgur.com/GDzi0Jg) <br />
[Image: Movie details view](https://imgur.com/kLsTbSq)


### Tech

- React
- tmdb API
- Material-ui
- Node.js
- Express
- PostgresSQL

## Support
If you have suggestions or issues, please email me at kai.m.peterson@gmail.com

---
