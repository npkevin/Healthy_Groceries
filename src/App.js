import React, { Component, useRef } from 'react';
import firebase from 'firebase/app'
import { PlusCircle } from 'react-feather'
import './App.css';

import RecipeView from './Recipe/RecipeView'
import OtherFoodView from './OtherFood/OtherFoodView'

import config from './firebase_config';
firebase.initializeApp(config);

class App extends Component {
  render = () => {
    return (
      <div>
        <div className="header">
          <h1>MACRO CHEF</h1>
        </div>
        <RecipeView />
        <OtherFoodView />
      </div>
    )
  }
}

export default App;
