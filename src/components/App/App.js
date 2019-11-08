import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

// Component imports
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
      <div className="App">
        <Route path="/" exact component={MovieList} />
        <Route path="/details" exact component={MovieDetails} />
      </div>
      </Router>
    );
  }
}

export default App;
