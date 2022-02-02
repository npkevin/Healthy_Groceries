import React, { Component } from "react"
import './Search.css'

import FoodSearch from '../Food/FoodSearch';
import NIXFood from '../Food/NutritionixAPI/NIXFood';
import { X } from "react-feather";


export default class Search extends Component {

  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();

    this.state = {
      searchResult: null,
    }

  }

  onSearchResult = (result) => {
    if (result.status === "ok") {
      this.setState({ searchResult: result.message })
    } else {
      this.setState({ searchResult: null })
    }
  }

  cancelSearch = () => {
    this.searchInputRef.current.clearSearch();
    this.setState({ searchResult: null })
    this.props.setShowSearch(false)
  }

  addFood = (food) => {
    this.props.addFoodToCard(food)
    this.cancelSearch();
  }

  render = () => {
    return (
      <div className={"recipeCard__foodSearch " + (this.props.showSearch ? "" : "-hide ")}>
        <div className="recipeCard__foodSearch__input">
          <FoodSearch onResult={res => this.onSearchResult(res)} ref={this.searchInputRef} />
          <button onClick={this.cancelSearch}><X /></button>
        </div>
        <div className="recipeCard__foodSearch__results ">
          {this.state.searchResult ? (
            <ul className="result">
              {this.state.searchResult.common.map((food, index) => {
                return (
                  <li key={"cfood_" + index} className="result__food common" onClick={() => this.addFood(food)}>
                    <div className="type common"></div>
                    <img src={food.photo.thumb} alt="" />
                    <span>{NIXFood.capitalizeEachWord(food.food_name)}</span>
                  </li>
                )
              })}
              {this.state.searchResult.branded.map((food, index) => {
                return (
                  <li key={"bfood_" + index} className="result__food branded" onClick={() => this.addFood(food)}>
                    <div className="type branded"></div>
                    <img src={food.photo.thumb} alt="" />
                    <span>{NIXFood.capitalizeEachWord(food.food_name)}</span>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
        <span className="attribution">Powered By Nutritionix</span>
      </div>
    )
  }
}