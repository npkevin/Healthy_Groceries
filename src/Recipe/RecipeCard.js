import React, { Component } from 'react';
import './RecipeCard.css';

import { PieChart, List, Plus, PlusCircle, Edit3, X, Check } from 'react-feather';
import Food from './Food'
import NutritionLabel from '../Food/NutritionLabel'
import FoodSearch from '../Food/FoodSearch';
import NIXFood from '../Food/NutritionixAPI/NIXFood';
import MacroRatio from './MacroRatio'


class recipeCard extends Component {

  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
    this.state = {
      name: this.props.name,
      foods: this.props.foods,
      flipped: false,
      editable: this.props.edit ? true : false,
      showSearch: false,
      searchResult: null,
    }
  }

  // This updates parent's (RecipeView) state.cards[this.key].foods
  // Aren't props supposed to be read-only?
  addFood = (food) => {
    const cleanedFood = new NIXFood(food)
    let foodsCopy = this.state.foods;
    foodsCopy.push(cleanedFood); // is it this line ???
    this.searchInputRef.current.clearSearch();
    this.setState({
      foods: foodsCopy,
      showSearch: false,
      searchResult: null,
    });
  }

  deleteFood = (index) => {
    let arrayCopy = this.state.foods
    arrayCopy.splice(index, 1)
    this.setState({
      foods: arrayCopy
    })
  }
  
  clearAllFoods = () => {
    this.setState({ food: [] })
  }

  saveChanges = () => {
    if (this.state.name !== this.props.name) this.props.updateName(this.state.name)
    // if (this.state.foods !== this.props.foods) this.props.updateFoods(this.state.foods)
    if (this.state.editable) this.setState({ editable: false })
  }

  discardChanges = () => {
    // Keep name as non-updated props.name
    this.setState({
      editable: false,
      name: this.props.name,
    })
  }

  // This updates parent's (RecipeView) state.cards[this.key].foods
  // Aren't props supposed to be read-only?
  setCustomMeasures = (index, user_data) => {
    let foodArr = this.state.foods;
    foodArr[index] = {
      ...this.state.foods[index],
      user: user_data,
    }
    this.setState({ foods: foodArr })
  }

  flipToBack = () => {
    this.setState({ flipped: true });
  }

  onSearchResult = (result) => {
    if (result.status === "ok") {
      this.setState({ searchResult: result.message })
    } else {
      this.setState({ searchResult: null })
    }
  }

  cancelSearch = () => {
    this.setState({ showSearch: false, searchResult: null })
  }

  getMacros = () => {
    // [fats, prot, carbs]
    let totalMacros = { f: 0, c: 0, p: 0 }

    // Each food is an NIXFood
    this.state.foods.forEach(food => {
      totalMacros.f += food.user ? food.user.nutrients.totalFats : food.nutrients.totalFats;
      totalMacros.p += food.user ? food.user.nutrients.totalProtiens : food.nutrients.totalProtiens;
      totalMacros.c += food.user ? food.user.nutrients.totalCarbs : food.nutrients.totalCarbs;
    })
    return totalMacros
  }

  render = () => {
    const macros = this.getMacros();
    return (
      <div className="recipeCard-Container">
        <div className={"recipeCard" + (this.state.flipped ? " -flipped" : "")}>
          <div className="recipeCard__front">
            <div className="recipeCard__navbar">
              <List className="recipeCard__navbar__icon" />
              {this.state.editable ?
                <>
                  <input
                    className="recipeCard__navbar__label -edit"
                    type="text" value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                  <Check className="recipeCard__navbar__button" onClick={this.saveChanges} />
                  <X className="recipeCard__navbar__button" onClick={this.discardChanges} />
                </>
                :
                <>
                  <span className="recipeCard__navbar__label" onClick={() => console.log(this.state.foods)}>{this.state.name}</span>
                  <Edit3 className="recipeCard__navbar__button" onClick={() => this.setState({ editable: true })} />
                  <PieChart className="recipeCard__navbar__button" onClick={this.flipToBack} />
                  <Plus className="recipeCard__navbar__button" onClick={() => this.setState({ showSearch: true })} />
                </>
              }
            </div>
            <div className="recipeCard__content">
              {/* =========================
            FOOD/INGREDIENT LIST
            ============================= */}
              {this.state.foods.length > 0 ?
                <ul className="recipeCard__foodList">
                  {this.state.foods.map((food, index) => {
                    return (<Food
                      edit={this.state.editable}
                      className="recipeCard__foodList__foodItem"
                      name={food.displayName}
                      thumbnail={food.photo.thumb}
                      measure={{
                        nutrients: food.nutrients,
                        weight_g: food.servingWeight.g,
                        user: food.user? food.user : false,
                      }}
                      setCustomMeasure={data => this.setCustomMeasures(index, data)}
                      deleteSelf={() => this.deleteFood(index)}
                      key={food.item.id + "_" + index}
                      as="li"
                    />)
                  })}
                </ul>
                : null}
            </div>
            <div className={"recipeCard__foodSearch " + (this.state.showSearch ? "" : "-hide ")}>
              <div className="recipeCard__foodSearch__input">
                <FoodSearch onResult={res => this.onSearchResult(res)} ref={this.searchInputRef} />
                <button onClick={this.cancelSearch}><X /></button>
              </div>
              <div className="recipeCard__foodSearch__results">
                {this.state.searchResult ? (
                  <>
                    <ul className="result">
                      {this.state.searchResult.common.map((food, index) => {
                        return (
                          <li key={"cfood_" + index} className="result__food" onClick={() => this.addFood(food)}>
                            <img src={food.photo.thumb} alt="" />
                            <span>{NIXFood.capitalizeEachWord(food.food_name)}</span>
                            <PlusCircle className="add" />
                          </li>
                        )
                      })}
                    </ul>
                    <span className="attribution no-result">
                      No more results
                    </span>
                  </>
                ) : null}
                <span className="attribution">
                  Powered By Nutritionix
                </span>
              </div>
            </div>
          </div>
          <div className="recipeCard__back">
            <div className="recipeCard__navbar">
              <PieChart className="recipeCard__navbar__icon" />
              <span className="recipeCard__navbar__label">Nutrients</span>
              <List className="recipeCard__navbar__button" onClick={() => this.setState({ flipped: false })} />
            </div>
            <div className="recipeCard__content">
              {/* ==============
            NUTRIENTS
            ================== */}
              {this.state.foods.length > 0 ?
                <>
                  <MacroRatio ratio={macros} />
                  <NutritionLabel langToggle>
                    {this.state.foods}
                  </NutritionLabel>
                  <span style={{ fontSize: "0.8rem" }}>* all values are rounded up</span>
                </>
                :
                <div className="no-data">
                  <span>No nutritional information to show</span>
                  <span>Please add some ingredients first</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default recipeCard;
