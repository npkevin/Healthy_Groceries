import React, { Component } from 'react';
import firebase from 'firebase/app'
import { PlusCircle } from 'react-feather'
import './App.css';

import RecipeView from './Recipe/RecipeView'
import OtherFoodView from './OtherFood/OtherFoodView'

import config from './firebase_config';
firebase.initializeApp(config);

class App extends Component {

  Section = (props) => {
    return (
      <div className="section">
        <div className="section__label">
            <h1 id="name">{props.name.toUpperCase()}</h1>
            <PlusCircle className="item-adder" size="3rem"/>
        </div>
        <div id="divider" />
        <div className="content-container">
          {props.children}
        </div>
      </div>
    )
  }

  render = () => {
    const Section = this.Section;
    return (
      <div>
        <div className="header">
          <h1>SMRT CHEF</h1>
        </div>
        <Section name="Recipes">
          <RecipeView />
        </Section>
        <Section name="Other Foods">
          <OtherFoodView />
        </Section>
      </div>
    )
  }

}

export default App;
