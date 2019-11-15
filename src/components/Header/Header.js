import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

// component imports
import SearchResultsModal from '../SearchResultsModal/SearchResultsModal'

class Header extends Component {
    state = {
        searchInput: '',
        isModalDisplayed: false,
    }

    handleChange = (event) => {
        this.setState({
            searchInput: event.target.value
        })
    }

    handleClick = () => {
        if (this.state.searchInput === '') {
            return alert('You need to type something to search for!')
        }
        this.props.dispatch({type: 'GET_API', payload: this.state})
        this.setState({
            searchInput: '',
            isModalDisplayed: true
        })
    }

    closeModal = () => {
        this.props.dispatch({ type: 'GET_MOVIES' })
        this.setState({
            isModalDisplayed: false,
        })
    }

    render() {
        return (
            <div className="header">
                <div className="headerBody">
                    <h1>Movie YAS Finder</h1>
                    <p className="addNewMovie">
                        Add New Movie: <input onChange={this.handleChange} className="searchBar" type='text' placeholder="SEARCH" value={this.state.searchInput}/>
                    </p>
                    <button onClick={this.handleClick} className="searchButton">Search</button>
                    {this.state.isModalDisplayed && <SearchResultsModal closeModal={this.closeModal} isModalDisplayed={this.state.isModalDisplayed}/>}
                </div>
            </div>
        );
    }
}

export default connect()(Header);
