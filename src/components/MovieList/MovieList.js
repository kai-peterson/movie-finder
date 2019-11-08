import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
            <>
                {this.props.movies.map((movie) =>
                    <div>
                        <img onClick={() => this.handleClick(movie.id)} src={movie.poster} />
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p>
                    </div>)}
            </>
        );
    }
}

const mapReduxStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapReduxStateToProps)(MovieList));
