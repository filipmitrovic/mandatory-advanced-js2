import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Main from './Main';
import Add from './Add';
import Edit from './Edit';
import Details from './Details'

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Navbar/>
        <Route exact path='/' component={Main} />
        <Route path='/Add' component={Add} />
        <Route path='/Edit/:id' component={Edit} />
        <Route path='/Details/:id' component={Details} />
      </div>
      </Router>
    )
  }
};

export default App;
