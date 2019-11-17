import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core'
import './MovieDetails.css'


class MovieDetails extends Component {
    state = {
        mode: true,
        details: {
            id: '',
            title: '',
            description: '',
        }
    }

    componentDidMount() {
        // pull movie id from url and get that movie's details on render
        // so user can refresh and details will reload instead of blowing away
        let { id } = this.props.match.params
        this.props.dispatch({type: 'GET_DETAILS', payload: {id}.id})
    }

    // simple onChange handler to update local state when inputs are changed
    handleChange = (prop) => (event) => {
        this.setState({
            details: {
                ...this.state.details,
                [prop]: event.target.value
            }
        })
    }

    backToHome = () => {
        this.props.history.push('/')
    }

    // swap to edit mode when 'edit' button is clicked
    // save current movies details to local state and swap mode so conditional rendering will trigger
    handleClick = (prop) => {
        if (prop === 'edit') {
            this.setState({
                mode: !this.state.mode,
                details: {
                    id: this.props.movieDetails.details.id,
                    title: this.props.movieDetails.details.title,
                    description: this.props.movieDetails.details.description,
                }
            })
        }
        this.setState({
            mode: !this.state.mode
        })
    }

    // handle click for Save button in edit mode
    // dispatch local state (which is updated with onChange when they type) to saga
    // saga updates in db with put req
    handleSaveClick = () => {
        this.props.dispatch({ type: 'UPDATE_DETAILS', payload: this.state.details });
        // swap mode back
        this.setState({
            mode: !this.state.mode
        })
    }

    render() {
        return (
            <>
                {/* Render normal movie details if mode is true (default) */}
                {this.state.mode &&
                    <>
                        <Button onClick={() => this.handleClick('edit')}>Edit</Button>
                        <Button onClick={this.backToHome}>Back to List</Button>
                        <Paper className="movieDetailsContainer">
                            {this.props.movieDetails && this.props.movieDetails.details && this.props.movieDetails.genres &&
                                <div>
                                    <img src={this.props.movieDetails.details.poster} alt={this.props.movieDetails.details.title + ' movie poster'} />
                                    <h2>{this.props.movieDetails.details.title}</h2>
                                    <p className="movieDescription">{this.props.movieDetails.details.description}</p>
                                    {/* <span className="genreTitle">
                                    Genres: {' '}
                                </span> */}
                                    <div className="genresContainer">
                                        {this.props.movieDetails.genres.map((genre, i) =>
                                            <span className="genreBox">{genre.name + ' '}</span>
                                        )}
                                    </div>
                                </div>
                            }
                        </Paper>
                    </>
                }
                {/* Render edit mode details (put title/description into inputs) if mode is false */}
                {this.state.mode === false &&
                    <>
                        <Button onClick={this.handleSaveClick}>Save</Button>
                        <Button onClick={this.handleClick}>Cancel</Button>
                        <Button onClick={this.backToHome}>Back to List</Button>
                        <Paper className="movieDetailsContainer">
                            {this.props.movieDetails && this.props.movieDetails.details && this.props.movieDetails.genres &&
                                <div>
                                    <img src={this.props.movieDetails.details.poster} alt={this.props.movieDetails.details.title + ' movie poster'} />
                                    <br />
                                    <input className="editInput" onChange={this.handleChange('title')} type="text" value={this.state.details.title} />
                                    <br />
                                    <textarea className="editTextArea" onChange={this.handleChange('description')} value={this.state.details.description}></textarea>
                                    <br />
                                    {this.props.movieDetails.genres.map((genre, i) =>
                                        <span className="genreBox">{genre.name + ' '}</span>
                                    )}
                                </div>
                            }
                        </Paper>
                    </>
                }
            </>
        );
    }
}

const mapReduxStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapReduxStateToProps)(MovieDetails));
