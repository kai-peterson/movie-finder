import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './SearchMovieItem.css'

// Material-ui imports
import { Card, CardActionArea, CardContent, Typography, Button } from '@material-ui/core'

class SearchMovieItem extends Component {
    state = {
        isAdded: false,
    }

    handleClick = (movie) => {
        this.props.dispatch({type: 'ADD_MOVIE', payload: movie})
        this.setState({
            isAdded: true,
        })
    }

    render() {
        return (
            <>
                {this.props.movie.poster_path &&
                    <div key={this.props.movie.id}>
                        {/* pass this.props.movie id to handleClick function onClick */}
                        <Card className="searchMovieCard">
                            <CardActionArea>
                                <img src={`https://image.tmdb.org/t/p/w300/${this.props.movie.poster_path}`} alt={this.props.movie.title + ' this.props.movie poster'} />
                                <CardContent>
                                    <Typography className="movieTitle" variant="h5">
                                        {this.props.movie.title}
                                    </Typography>
                                    <Typography variant="body1">
                                        {this.props.movie.overview}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            {!this.state.isAdded ? 
                                <Button onClick={() => this.handleClick(this.props.movie)} fullWidth>Add Movie</Button> :
                                <Button className="addedButton" fullWidth disabled>Added</Button>
                            }
                        </Card>
                    </div>
                }
            </>
        );
    }
}

const mapReduxStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapReduxStateToProps)(SearchMovieItem));
