import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class MovieDetails extends Component {
    state = {
        mode: true,
        details: {
            id: '',
            title: '',
            description: '',
        }
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
        this.props.dispatch({type: 'UPDATE_DETAILS', payload: this.state.details});
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
                        <button onClick={this.backToHome}>Back to List</button>
                        <button onClick={() => this.handleClick('edit')}>Edit</button>
                        {this.props.movieDetails && this.props.movieDetails.details && this.props.movieDetails.genres &&
                            <div>
                                <img src={this.props.movieDetails.details.poster} alt={this.props.movieDetails.details.title + ' movie poster'}/>
                                <h2>{this.props.movieDetails.details.title}</h2>
                                <p>{this.props.movieDetails.details.description}</p>
                                <ul>
                                    {this.props.movieDetails.genres.map((genre, i) =>
                                        <li key={i}>
                                            {genre.name}
                                        </li>
                                    )}
                                </ul>
                                <pre>{JSON.stringify(this.props.movieDetails.details, null, 2)}</pre>
                                <pre>{JSON.stringify(this.props.movieDetails.genres, null, 2)}</pre>
                            </div>
                        }
                    </>
                }
                {/* Render edit mode details (put title/description into inputs) if mode is false */}
                {this.state.mode === false &&
                    <>
                        <button onClick={this.backToHome}>Back to List</button>
                        <button onClick={this.handleSaveClick}>Save</button>
                        <button onClick={this.handleClick}>Cancel</button>
                        {this.props.movieDetails && this.props.movieDetails.details && this.props.movieDetails.genres &&
                            <div>
                                <img src={this.props.movieDetails.details.poster} alt={this.props.movieDetails.details.title + ' movie poster'}/>
                                <br/>
                                <input onChange={this.handleChange('title')} type="text" value={this.state.details.title} />
                                <br/>
                                <textarea onChange={this.handleChange('description')} value={this.state.details.description}></textarea>
                                <ul>
                                    {this.props.movieDetails.genres.map((genre, i) =>
                                        <li key={i}>
                                            {genre.name}
                                        </li>
                                    )}
                                </ul>
                                <pre>{JSON.stringify(this.state, null, 2)}</pre>
                                <pre>{JSON.stringify(this.props.movieDetails.details, null, 2)}</pre>
                                <pre>{JSON.stringify(this.props.movieDetails.genres, null, 2)}</pre>
                            </div>
                        }
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
