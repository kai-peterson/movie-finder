import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './MovieList.css'

class MovieList extends Component {
    // Renders the entire app on the DOM

    componentDidMount() {
        // dispatch to grab movies
        this.props.dispatch({ type: 'GET_MOVIES' })
    }

    handleClick = (id) => {
        this.props.history.push('/details')
        this.props.dispatch({type: 'GET_DETAILS', payload: id});
    }

    render() {
        return (
            <div className="allMovies">
                {this.props.movies.map((movie) =>
                    <div className="movieCard" key={movie.id}>
                        <img onClick={() => this.handleClick(movie.id)} src={movie.poster} />
                        <h2>{movie.title}</h2>
                        {/* <p>{movie.description}</p> */}
                    </div>)}
            </div>
        );
    }
}

const mapReduxStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapReduxStateToProps)(MovieList));
