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
      synched: false,
      editable: false,
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
      serves: 1
    }
    this.setState({ cards: cardsCopy, synched: false })
  }

  deleteCard = (key) => {
    console.log(key)
    let cardsCopy = this.state.cards
    delete cardsCopy[key]
    this.setState({ cards: cardsCopy, synched: false})
  }

  updateCard = (newCard, cardKey) => {
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

  render = () => {
    return (
      <>
        <Section className="RecipeView" name="Recipes"
          add={this.addCard}
          edit={() => this.setState({ editable: !this.state.editable })}
          editable={this.state.editable}
          synched={this.state.synched}
          saveState={this.saveState}
        >
          {Object.keys(this.state.cards).length > 0 ?
            Object.keys(this.state.cards).sort().reverse().map(cardKey => {
              return <RecipeCard
                name={this.state.cards[cardKey].name}
                foods={this.state.cards[cardKey].foods}
                serves={this.state.cards[cardKey].serves}
                updateCard={newCard => this.updateCard(newCard, cardKey)}
                editable={this.state.editable}
                deleteSelf={() => this.deleteCard(cardKey)}
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
