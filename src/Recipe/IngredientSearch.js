import React, { Component } from 'react'
import './IngredientSearch.css'

import NIXFood from '../NutritionixAPI/NIXFood';
import firebase from 'firebase/app';
import 'firebase/functions';
import { X, PlusCircle } from 'react-feather'

class IngredientSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerms: "",
      searchResults: undefined,
    }
  }

  // Searches after a delay
  delayedSearch = (searchTerm) => {
    this.setState({ searchTerms: searchTerm });
    // dont search with user empties input
    if (searchTerm === "") return;
    if (this.timeoutID !== undefined) clearTimeout(this.timeoutID);
    // while typing, reset the timer. After 1 second call firebase function to search
    this.timeoutID = setTimeout(() => {
      this.instantSearch(searchTerm)
    }, 400);
  }

  instantSearch = (searchTerm) => {
    console.log("Searching: " + searchTerm)
    const search = firebase.app().functions('us-east4').httpsCallable('searchInstantNX');
    search({ search: searchTerm })
    .then(result => {
      if (result.data.status === "ok") {
        this.setState({ searchResults: result.data.message })
        console.log(result.data.message)
      } else {
        console.error(result.data.message)
      }
    })
    .catch(e => {
      console.error(e)
    })
  }

  cancelSearch = () => {
    this.props.setShow(false)
    this.setState({ searchResults: undefined, searchTerms: "" })
  }

  // Cleaning of data is only only done when adding to RecipeCard
  addFoodHandler = (food) => {
    this.props.addFood(food);
    this.cancelSearch();
  }


  render = () => {
    return (
      <div className={"IngredientSeach" + (this.props.show ? "" : " hide")}>
        <div className="IngredientSeach__input">
          <input type="text" placeholder="Search Food Here..." onChange={e => this.delayedSearch(e.target.value)} value={this.state.searchTerms} />
          <button onClick={this.cancelSearch}>
            <X size="1rem" />
          </button>
        </div>
        {this.state.searchResults ? (
          <ul className="results">
            {this.state.searchResults.common.map((food, index) => {
              return (
                <li key={"commFoodKey_" + index} onClick={() => this.addFoodHandler(food)}>
                  <PlusCircle size="1rem" />
                  <span>{NIXFood.capitalizeEachWord(food.food_name)}</span>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    )
  }
}

export default IngredientSearch;