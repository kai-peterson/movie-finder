import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Material-ui imports
import { Card, CardActionArea, CardContent, Typography, Button } from '@material-ui/core'

class MovieList extends Component {
    state = {
        charactersToShow: 300,
        isExpanded: false,
    }

    handleExpansion = () => {
        if (!this.state.isExpanded) {
            this.setState({
                charactersToShow: this.props.movie.description.length,
                isExpanded: true,
            })
        }
        else {
            this.setState({
                charactersToShow: 300,
                isExpanded: false,
            })
        }
    }

    handleClick = (id) => {
        this.props.history.push('/details')
        this.props.dispatch({ type: 'GET_DETAILS', payload: id });
    }


    render() {
        return (
            <div key={this.props.movie.id}>
                {/* pass this.props.movie id to handleClick function onClick */}
                <Card className="movieCard">
                    <CardActionArea onClick={() => this.handleClick(this.props.movie.id)}>
                        <img src={this.props.movie.poster} alt={this.props.movie.title + ' this.props.movie poster'} className="movieImage" />
                        <CardContent>
                            <Typography className="movieTitle" variant="h5">
                                {this.props.movie.title}
                            </Typography>
                            {!this.state.isExpanded ?
                                <Typography variant="body1">
                                    {this.props.movie.description.slice(0, this.state.charactersToShow)}
                                </Typography> :
                                <Typography variant="body1">
                                    {this.props.movie.description}
                                </Typography>
                            }
                        </CardContent>
                    </CardActionArea>
                    {!this.state.isExpanded ?
                        <Button onClick={this.handleExpansion}>Show more</Button> :
                        <Button onClick={this.handleExpansion}>Show less</Button>
                    }
                </Card>
            </div>
        );
    }
}

const mapReduxStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapReduxStateToProps)(MovieList));
