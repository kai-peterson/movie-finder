import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './MovieList.css'

// Component imports
import MovieItem from '../MovieItem/MovieItem'

class MovieList extends Component {
    state = {
        expansionPanel: {
            charactersToShow: 300,
            isExpanded: false,
        }
    }

    // make GET req to grab movies on page render
    componentDidMount() {
        // dispatch to grab movies
        this.props.dispatch({ type: 'GET_MOVIES' })
    }

    handleExpansion = () => {

    }

    // on click, dispatch to GET_DETAILS saga with specific movie id
    // send users to /details page

    render() {
        return (
            <div className="allMovies">
                {this.props.movies.map((movie) =>
                    <MovieItem movie={movie}/>
                )}
                {/* <img onClick={() => this.handleClick(movie.id)} src={movie.poster} alt={movie.title + ' movie poster'} />
                            <h2>{movie.title}</h2>
                            <p>{movie.description}</p> */}
            </div>
        );
    }
}

const mapReduxStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapReduxStateToProps)(MovieList));
