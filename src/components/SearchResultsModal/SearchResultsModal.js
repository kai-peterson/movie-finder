import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import './SearchResultsModal.css'

// component imports
import SearchMovieItem from '../SearchMovieItem/SearchMovieItem'

class SearchResultsModal extends Component {
    render() {
        return (
            <Modal
                className="searchResultsModal"
                open={this.props.isModalDisplayed}
                onClose={this.props.closeModal}
                disableScrollLock
            >
                <div className="modalContentContainer">
                    <div className="modalContent">
                        <h1 className="resultsHeader">Search Results: </h1>
                        {this.props.searchResults.map((movie) =>
                            <SearchMovieItem movie={movie} />
                        )}
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapReduxStateToProps = (state) => {
    return state;
}

export default connect(mapReduxStateToProps)(SearchResultsModal);
