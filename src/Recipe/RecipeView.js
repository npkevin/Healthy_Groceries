import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Section from '../Section'
import RecipeCard from './RecipeCard'
import './RecipeView.css';

class RecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: {},
    }
  }

  addCard = () => {
    // Keys should be unique, for this purpose date.now() is fine
    // User will find it very hard to add a new card in the same millisecond
    const key = Date.now();
    let cardsCopy = this.state.cards
    cardsCopy[key] = {
      name: 'new card',
      foods: [],
    }
    console.log("Adding RecipeCard: ", key)
    this.setState({ cards: cardsCopy })
  }

  updateCardName = (newName, cardKey) => {
    console.log("Changing Card[" + cardKey + "] name to: " + newName)
    let cardsCopy = this.state.cards
    cardsCopy[cardKey].name = newName
    this.setState({ cards: cardsCopy })
  }


  saveState = () => {
    const db = firebase.app().firestore()
    const state = this.state.cards
    db.collection('user-recipes').doc('guest').set(state)
  }

  loadState = () => {
    const db = firebase.app().firestore()
    db.collection('user-recipes').doc('guest').get().then(query => {
      this.setState({ cards: query.data() })
    })
  }

  render = () => {
    return (
      <>
        <button onClick={this.saveState}>Save State</button>
        <button onClick={this.loadState}>Load State</button>
        <Section className="RecipeView" name="Recipes" add={this.addCard}>
          {Object.keys(this.state.cards).length > 0 ?
            Object.keys(this.state.cards).sort().reverse().map(cardKey => {
              return <RecipeCard
                name={this.state.cards[cardKey].name}
                foods={this.state.cards[cardKey].foods}
                updateName={newName => this.updateCardName(newName, cardKey)}
                key={cardKey}
              />
            })
            : null}
        </Section>
      </>
    )
  }

}

export default RecipeView;
