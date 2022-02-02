import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { v1 as uuidv1 } from 'uuid';

import Section from '../Section'
import RecipeCard from './RecipeCard'
import './RecipeView.css';

class RecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: {},
      synched: false,
      editable: false,
    }
  }

  componentDidMount = () => {
    this.loadState()
  }

  render = () => {
    return (
      <>
        <Section className="RecipeView" name="Recipes"
          editable={this.state.editable}
          synched={this.state.synched}
          saveState={this.saveState}
          addCardFunc={this.addCard}
          toggleEdit={() => this.setState({ editable: !this.state.editable })}
        >
          {Object.keys(this.state.cards).length > 0 ?
            Object.keys(this.state.cards).map(cardKey => {
              return <RecipeCard
                recipeName={this.state.cards[cardKey].recipeName}
                ingredients={this.state.cards[cardKey].ingredients}
                servings={this.state.cards[cardKey].servings}
                editable={this.state.editable}
                deleteSelf={() => this.deleteCard(cardKey)}
                key={cardKey}
                updateCard={newCard => this.updateCard(cardKey, newCard)}
              />
            })
            : null}
        </Section>
      </>
    )
  }

  addCard = () => {
    const key = uuidv1();
    let cardsCopy = this.state.cards
    cardsCopy[key] = {
      recipeName: 'new card',
      ingredients: [],
      servings: 1
    }
    this.setState({ cards: cardsCopy, synched: false })
  }

  deleteCard = (key) => {
    console.log(key)
    let cardsCopy = this.state.cards
    delete cardsCopy[key]
    this.setState({ cards: cardsCopy, synched: false })
  }

  updateCard = (cardKey, newCard) => {
    let cardsCopy = this.state.cards
    cardsCopy[cardKey] = newCard
    this.setState({ cards: cardsCopy, synched: false })
  }

  saveState = () => {
    const db = firebase.app().firestore()
    const state = this.state.cards
    db.collection('user-recipes').doc('guest').set(state)
    this.setState({ synched: true })
  }

  loadState = () => {
    const db = firebase.app().firestore()
    db.collection('user-recipes').doc('guest').get().then(query => {
      this.setState({ cards: query.data(), synched: true })
    })
  }
}

export default RecipeView;
