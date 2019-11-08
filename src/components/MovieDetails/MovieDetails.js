import React, { Component } from 'react';
import { connect } from 'react-redux';

class MovieDetails extends Component {
    render() {
        return (
            <>
                <img src={this.props.movieDetails.poster} />
                <h2>{this.props.movieDetails.title}</h2>
                <p>{this.props.movieDetails.description}</p>
                <pre>{JSON.stringify(this.props.movieDetails, null, 2)}</pre>
            </>
        );
    }
}

const mapReduxStateToProps = (state) => {
    return state;
}

export default connect(mapReduxStateToProps)(MovieDetails);
