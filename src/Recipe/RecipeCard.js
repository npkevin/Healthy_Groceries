import React, { Component } from 'react';
import './RecipeCard.css';

import { Pie } from 'react-chartjs-2';
import { PieChart, List, Plus, PlusCircle, Edit3, X } from 'react-feather';
import Food from '../Food/Food'
import FoodSearch from '../Food/FoodSearch';
import NIXFood from '../Food/NutritionixAPI/NIXFood';


class RecipeCard extends Component {

  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
    this.state = {
      flipped: false,
      showSearch: false,
      searchResult: null,
      foods: [],
      chartjs: null,
    }
  }

  addFood = (food) => {
    let newFoodArr = this.state.foods;
    let cleanedFood = new NIXFood(food)
    newFoodArr.push(cleanedFood.data);
    this.searchInputRef.current.clearSearch();
    this.setState({
      foods: newFoodArr,
      showSearch: false,
      searchResult: null,
    });
  }

  clearAllFoods = () => {
    this.setState({ food: [] })
  }

  flipToBack = () => {
    if (this.state.foods.length > 0) this.updateChartjsData();
    this.setState({ flipped: true });
  }

  onSearchResult = (result) => {
    if (result.status === "ok") {
      console.log(result.message)
      // common OR/AND branded
      this.setState({ searchResult: result.message })
    } else {
      this.setState({ searchResult: null })
    }
  }

  updateChartjsData = () => {
    // [fats, prot, carbs]
    let totalMacros = [0, 0, 0]

    this.state.foods.forEach(food => {
      totalMacros[0] += food.nutrients.macros.f;
      totalMacros[1] += food.nutrients.macros.p;
      totalMacros[2] += food.nutrients.macros.c;
    })

    // dirty fix for small decimals: apparently chartjs can take strings aswell as numbers here
    totalMacros[0] = totalMacros[0].toFixed(2);
    totalMacros[1] = totalMacros[1].toFixed(2);
    totalMacros[2] = totalMacros[2].toFixed(2);

    this.setState({
      chartjs: {
        data: {
          labels: ['Fats', 'Protiens', 'Carbs'],
          datasets: [{
            data: totalMacros,
            backgroundColor: ['#f1c40f', '#e74c3c', '#3498db'],
          }],
        },
        options: {
          legend: {
            labels: {
              // boxWidth: 12,
              fontFamily: "'Nunito', sans-serif",
              // usePointStyle: true,
            }
          }
        }
      }
    })
  }

  render = () => {
    return (
      <div className="RecipeCard-Container">
        <div className={"RecipeCard" + (this.state.flipped ? " flipped" : "")}>
          <div className="front">
            <div className="RecipeCard__navbar">
              <List className="icon" />
              <span className="label">{this.props.name}</span>
              <Edit3 className="button" onClick={() => { }} />
              <PieChart className="button" onClick={this.flipToBack} />
              <Plus className="button" onClick={() => this.setState({ showSearch: true })} />
            </div>
            {/* FOOD/INGREDIENT LIST */}
            {this.state.foods.length > 0 ?
              <ul className="RecipeCard__FoodList">
                {this.state.foods.map(food => {
                  return <Food food={food} key={food.item.id} className="Food"/>
                })}
              </ul>
              : null}
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
                  <ul className="result">
                    {this.state.searchResult.common.map((food, index) => {
                      return (
                        <li key={"commFoodKey_" + index} className="food" onClick={() => this.addFood(food)}>
                          <span>{NIXFood.capitalizeEachWord(food.food_name)}</span>
                          <PlusCircle className="add" />
                        </li>
                      )
                    })}
                    <li className="food-end">
                      <span>
                        No more results
                      </span>
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
          <div className="back">
            <div className="RecipeCard__navbar">
              <PieChart className="icon" />
              <span className="label">Nutrients</span>
              <List className="button" onClick={() => this.setState({ flipped: false })} />
            </div>
            {/* PIE CHART FOR NUTRIENTS */}
            {this.state.chartjs !== null ?
              <Pie data={this.state.chartjs.data} options={this.state.chartjs.options} />
              :
              <div className="chartjs-no-data">
                <span>No nutritional information to show</span>
                <span>Please add some ingredients first</span>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeCard;
