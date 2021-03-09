import React, { Component } from 'react';
import './RecipeCard.css';

import { PieChart, List, Plus, PlusCircle, Edit3, X, Check } from 'react-feather';
import Food from '../Food/Food'
import NutritionLabel from '../Food/NutritionLabel'
import FoodSearch from '../Food/FoodSearch';
import NIXFood from '../Food/NutritionixAPI/NIXFood';
import MacroRatio from './MacroRatio'


class RecipeCard extends Component {

  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
    this.state = {
      flipped: false,
      editable: this.props.edit ? true : false,
      name: this.props.name, // * TODO: upload firebase to save this card
      showSearch: false,
      searchResult: null,
      foods: [], // * TODO: upload firebase to save this card
      chartjs: null,
    }
  }

  addFood = (food) => {
    let foodArr = this.state.foods;
    let cleanedFood = new NIXFood(food)
    foodArr.push(cleanedFood.data);
    this.searchInputRef.current.clearSearch();
    this.setState({
      foods: foodArr,
      showSearch: false,
      searchResult: null,
    });
  }

  updateFoodUserData = (index, user_data) => {
    let foodArr = this.state.foods;
    foodArr[index] = {
      ...this.state.foods[index],
      user: user_data,
    }
    this.setState({ foods: foodArr })
  }

  clearAllFoods = () => {
    this.setState({ food: [] })
  }

  flipToBack = () => {
    this.setState({ flipped: true });
  }

  // TODO: add more than just updating names
  saveChanges = () => {
    this.props.updateName(this.state.name, this.props.index)
    this.setState({ editable: false })
  }

  discardChanges = () => {
    // Keep name as non-updated props.name
    this.setState({
      editable: false,
      name: this.props.name,
    })
  }

  onSearchResult = (result) => {
    if (result.status === "ok") {
      // console.log(result.message)
      // common OR/AND branded
      this.setState({ searchResult: result.message })
    } else {
      this.setState({ searchResult: null })
    }
  }

  getMacros = () => {
    // [fats, prot, carbs]
    let totalMacros = {f: 0, c: 0, p: 0}

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
      <div className="RecipeCard-Container">
        <div className={"RecipeCard" + (this.state.flipped ? " flipped" : "")}>
          <div className="front">
            <div className="RecipeCard__navbar">
              <List className="icon" />
              {this.state.editable ?
                <>
                  <input
                    className="label edit"
                    type="text" value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                  <Check className="button" onClick={this.saveChanges} />
                  <X className="button" onClick={this.discardChanges} />
                </>
                :
                <>
                  <span className="label">{this.state.name}</span>
                  <Edit3 className="button" onClick={() => this.setState({ editable: true })} />
                  <PieChart className="button" onClick={this.flipToBack} />
                  <Plus className="button" onClick={() => this.setState({ showSearch: true })} />
                </>
              }
            </div>
            <div className="content">
            {/* =========================
            FOOD/INGREDIENT LIST
            ============================= */}
            {this.state.foods.length > 0 ?
              <ul className="RecipeCard__FoodList">
                {this.state.foods.map((food, index) => {
                  return (<Food
                    className="Food"
                    food={food}
                    key={food.item.id + "_" + index}
                    index={index}
                    updateSelf={this.updateFoodUserData}
                  />)
                })}
              </ul>
              : null}
            </div>
            {/* ===============================
            TOGGABLE FOOD/INGREDIENT SEARCH 
            =================================== */}
            <div className={"RecipeCard__Search" + (this.state.showSearch ? "" : " hide")}>
              <div className="input-container">
                <FoodSearch className="FoodSearch__input" onResult={res => this.onSearchResult(res)} ref={this.searchInputRef} />
                <button onClick={() => this.setState({ showSearch: false })} className="FoodSearch__btn"><X /></button>
              </div>
              <div className="result-container">
                {this.state.searchResult ? (
                  <>
                  <ul className="result">
                    {this.state.searchResult.common.map((food, index) => {
                      return (
                        <li key={"commFoodKey_" + index} className="food" onClick={() => this.addFood(food)}>
                          <img src={food.photo.thumb} alt=""/>
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
          <div className="back">
            <div className="RecipeCard__navbar">
              <PieChart className="icon" />
              <span className="label">Nutrients</span>
              <List className="button" onClick={() => this.setState({ flipped: false })} />
            </div>
            <div className="content">
            {/* ==============
            NUTRIENTS
            ================== */}
            {this.state.foods.length > 0 ?
              <>
                {/* <span style={{fontSize: "0.8rem"}}>* all values are rounded up</span> */}
                <MacroRatio ratio={macros} />
                <NutritionLabel langToggle>
                  {this.state.foods}
                </NutritionLabel>
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

export default RecipeCard;
