import React, { Component } from 'react'
import Section from '../Section'
import './RecipeView.css';

import RecipeCard from './RecipeCard'

class RecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewRecipe: false,
      cards: [],
    }
  }

  // Add cards by name
  addCard = () => {
    this.setState({
      cards: [
        ...this.state.cards,
        "new card",
      ]
    })
  }

  updateName = (name, index) => {
    let cardsCopy = [...this.state.cards];
    cardsCopy[index] = name;
    this.setState({cards: cardsCopy})
  }

  render = () => {
    return (
      <Section className="RecipeView" name="Recipes" add={this.addCard}>
        { this.state.cards.length > 0 ?
          this.state.cards.map((cardName, index) => {
            return <RecipeCard name={cardName} key={index} updateName={this.updateName} />
          })
          : null}
      </Section>
    )
  }

}

export default RecipeView;
