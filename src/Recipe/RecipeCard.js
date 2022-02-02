import React, { Component } from 'react';
import './RecipeCard.css';

import { PieChart, List, Plus, Edit3, X, Check, Trash2 } from 'react-feather';
import Food from './Food'
import NIXFood from '../Food/NutritionixAPI/NIXFood';
import NutritionLabel from '../Food/NutritionLabel'
import Search from './Search';

import MacroRatio from './MacroRatio'


class recipeCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipeName: props.recipeName,
      ingredients: props.ingredients, //array of objects
      servings: props.servings,
      isFlipped: false,
      editable: props.editable,
      showSearch: false,
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    let updateFlag = false
    console.log(prevState.ingredients);
    console.log(this.state.ingredients);
    if (prevState.ingredients !== this.state.ingredients) updateFlag = true
    if (prevState.servings !== this.state.servings) updateFlag = true
    if (updateFlag) this.props.updateCard(this.state)
  }

  addFood = (food) => {
    const nixFood = new NIXFood(food)
    const cleanedFood = nixFood.data
    let copy = [...this.state.ingredients];
    copy.push(cleanedFood);

    this.setState({
      ingredients: copy,
      showSearch: false,
      searchResult: null,
    });
  }

  deleteFood = (index) => {
    let copy = [...this.state.ingredients]
    copy.splice(index, 1)
    this.setState({
      ingredients: copy
    })
  }

  updateName = () => {
    if (this.state.recipeName !== this.props.recipeName) this.props.updateCard(this.state)
    this.setState({ editable: false })
  }

  discardChanges = () => {
    this.setState({
      editable: false,
      recipeName: this.props.recipeName, // Keep name as original unsaved name
    })
  }

  // This updates parent's (RecipeView) state.cards[this.key].foods
  // Aren't props supposed to be read-only?
  setCustomMeasures = (index, user_data) => {
    let foodArr = [...this.state.ingredients];
    foodArr[index] = {
      ...this.state.ingredients[index],
      user: user_data,
    }
    this.setState({ ingredients: foodArr })
  }

  flipToSide = (side) => {
    this.setState({ isFlipped: side === "front" ? false : true });
  }

  getMacros = () => {
    // [fats, prot, carbs]
    let totalMacros = { f: 0, c: 0, p: 0 }

    // Each food is an NIXFood
    this.state.ingredients.forEach(food => {
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
        <div className={"recipeCard__deleteOverlay " + (this.props.editable ? "--editable " : "")}>
          <Trash2 className="recipeCard__deleteOverlay__delbutton" size="10rem" onClick={this.props.deleteSelf} />
        </div>
        <div className={"recipeCard" + (this.state.isFlipped ? " -flipped" : "")}>
          <div className="recipeCard__front">
            <div className="recipeCard__navbar">
              <List className="recipeCard__navbar__icon" />
              {this.state.editable ?
                <>
                  <input
                    className="recipeCard__navbar__label -edit"
                    type="text" value={this.state.recipeName}
                    onChange={e => this.setState({ recipeName: e.target.value })}
                  />
                  <Check className="recipeCard__navbar__button" onClick={this.updateName} />
                  <X className="recipeCard__navbar__button" onClick={this.discardChanges} />
                </>
                :
                <>
                  <span className="recipeCard__navbar__label">{this.state.recipeName}</span>
                  <Edit3 className="recipeCard__navbar__button" onClick={() => this.setState({ editable: true })} />
                  <PieChart className="recipeCard__navbar__button" onClick={() => this.flipToSide("back")} />
                  <Plus className="recipeCard__navbar__button" onClick={() => this.setState({ showSearch: true })} />
                </>
              }
            </div>
            <div className="recipeCard__content">
              {/* =========================
            FOOD/INGREDIENT LIST
            ============================= */}
              {this.state.ingredients.length > 0 ?
                <ul className="recipeCard__foodList">
                  {this.state.ingredients.map((food, index) => {
                    return (<Food
                      edit={this.state.editable}
                      className="recipeCard__foodList__foodItem"
                      name={food.displayName}
                      thumbnail={food.photo.thumb}
                      measure={{
                        nutrients: food.nutrients,
                        weight_g: food.servingWeight.g,
                        user: food.user ? food.user : false,
                      }}
                      setCustomMeasure={user_data => this.setCustomMeasures(index, user_data)}
                      deleteSelf={() => this.deleteFood(index)}
                      key={food.item.id + "_" + index}
                      as="li"
                    />)
                  })}
                </ul>
                : null}
            </div>
            <Search
              showSearch={this.state.showSearch}
              setShowSearch={bool => this.setState({ showSearch: bool })}
              addFoodToCard={this.addFood}
            />
          </div>
          <div className="recipeCard__back">
            <div className="recipeCard__navbar">
              <PieChart className="recipeCard__navbar__icon" />
              <span className="recipeCard__navbar__label">Nutrients</span>
              <List className="recipeCard__navbar__button" onClick={() => this.flipToSide("front")} />
            </div>
            <div className="recipeCard__content">
              {/* ==============
            NUTRIENTS
            ================== */}
              {this.state.ingredients.length > 0 ?
                <>
                  <MacroRatio ratio={macros} />
                  <NutritionLabel
                    serves={this.state.servings}
                    updateServings={newVal => this.setState({ servings: newVal })}
                    foods={this.state.ingredients}
                    langToggle />
                  {/* <span style={{ fontSize: "0.8rem" }}>* all values are rounded up</span> */}
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
