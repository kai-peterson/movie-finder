import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';

// Component imports
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import Header from '../Header/Header'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
      <Header />
      <div className="App">
        <Route path="/" exact component={MovieList} />
        <Route path="/details" exact component={MovieDetails} />
      </div>
      </Router>
    );
  }
}

export default App;
