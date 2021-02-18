import React, { Component } from 'react'
import { PlusCircle } from 'react-feather'
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

  render = () => {
    return (
      <div className="RecipeView">
        <RecipeCard name="Hamburger" />
      </div>
    )
  }

}

export default RecipeView;
