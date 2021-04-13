import React, { Component } from 'react';
import firebase from 'firebase/app'
import './App.css';

import RecipeView from './Recipe/RecipeView'

import config from './firebase_config';
firebase.initializeApp(config);

class App extends Component {
  render = () => {
    return (
      <div className="app-container">
        <RecipeView />
      </div>
    )
  }
}

export default App;
