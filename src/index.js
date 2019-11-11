import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMovieSaga);
    yield takeEvery('GET_DETAILS', getMovieDetailsSaga);
    yield takeEvery('UPDATE_DETAILS', updateMovieDetailsSaga);
}

// Create saga to grab movies from db
function* getMovieSaga(action) {
    try {
        const allMovies = yield axios.get('/movies')
        yield put({type: 'SET_MOVIES', payload: allMovies.data})
    }
    catch (error) {
        console.log('error in getMovieSaga', error);
    }
}

// Create saga to get a single movie's details and genres from db
// dispatch details and genres as an array to SET_DETAILS reducer
function* getMovieDetailsSaga(action) {
    try {
        const movieDetails = yield axios.get(`/movies/${action.payload}`)
        const movieGenre = yield axios.get(`/movies/genre/${action.payload}`)
        yield put({type: 'SET_DETAILS', payload: [movieDetails.data[0], movieGenre.data]})
    }
    catch (error) {
        console.log('error in getMovieDetailsSaga', error);
    }
}

// Create saga to update a movie's details in db
// recieves and action with new title/description and makes put req to update in db
// dispatch to GET_DETAILS to re-render correct movie info on DOM
function* updateMovieDetailsSaga(action) {
    try {
        console.log(action.payload);
        
        yield axios.put(`/movies/${action.payload.id}`, {title: action.payload.title, description: action.payload.description});
        yield put({type: 'GET_DETAILS', payload: action.payload.id})
    }
    catch (error) {
        console.log('error in updateMovieDetailsSaga', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store a single movie's details
// also stores genres for the movie that's currently being held here
const movieDetails = (state = {}, action) => {
    console.log(action);
    
    switch (action.type) {
        case 'SET_DETAILS':
            return {details: action.payload[0], genres: action.payload[1]};
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        movieDetails,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
