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
      synched: false
    }
  }

  componentDidMount = () => {
    this.loadState()
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

  updateCard = (newCard, cardKey) => {
    console.log("Updating Card[" + cardKey + "]")
    let cardsCopy = this.state.cards
    cardsCopy[cardKey] = newCard
    this.setState({ cards: cardsCopy, synched: false })
  }


  saveState = () => {
    const db = firebase.app().firestore()
    const state = this.state.cards
    db.collection('user-recipes').doc('guest').set(state)
    this.setState({synched: true})
  }

  loadState = () => {
    const db = firebase.app().firestore()
    db.collection('user-recipes').doc('guest').get().then(query => {
      this.setState({ cards: query.data(), synched: true})
    })
  }

  render = () => {
    return (
      <>
        <Section className="RecipeView" name="Recipes"
          add={this.addCard}
          synched={this.state.synched}
          loadState={this.loadState}
          saveState={this.saveState}
        >
          {Object.keys(this.state.cards).length > 0 ?
            Object.keys(this.state.cards).sort().reverse().map(cardKey => {
              return <RecipeCard
                name={this.state.cards[cardKey].name}
                foods={this.state.cards[cardKey].foods}
                serves={this.state.cards[cardKey].serves}
                updateCard={newCard => this.updateCard(newCard, cardKey)}
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
