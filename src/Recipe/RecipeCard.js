import React, { Component } from 'react';
import './RecipeCard.css';

import { Pie } from 'react-chartjs-2';
import { PieChart, List, Plus, Edit3 } from 'react-feather';
import Ingredient from '../Ingredient/Ingredient'
import IngredientSearch from './IngredientSearch';
import NIXFood from '../NutritionixAPI/NIXFood';

// import Ingredient from '../Ingredient/Ingredient'

class RecipeCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      flipped: false,
      showSearch: false,
      foods: [],
      chartjs: null,
    }
  }

  setShow = (bool) => {
    this.setState({ showSearch: bool })
  }

  addFood = (food) => {
    let newFoodArr = this.state.foods;
    let cleanedFood = new NIXFood(food)
    newFoodArr.push(cleanedFood.data);
    this.setState({ foods: newFoodArr });
  }

  clearAllFoods = () => {
    this.setState({ food: [] })
  }

  flipToBack = () => {
    if (this.state.foods.length > 0) this.updateChartjsData();
    this.setState({ flipped: true });

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
          labels: ['Fats', 'Protien', 'Carbs'],
          datasets: [{
            data: totalMacros,
            backgroundColor: ['#feca57', '#ff6b6b', '#54a0ff'],
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
          <div className="RecipeCard--front">
            <div className="RecipeCard__tittle">
              <List className="tittle-icons" />
              <span>{this.props.name}</span>
              <Edit3 className="tittle-btns" onClick={() => { }} />
              <PieChart className="tittle-btns" onClick={this.flipToBack} />
              <Plus className="tittle-btns" onClick={() => this.setShow(true)} />
            </div>
            {this.state.foods.length > 0 ?
              <table className="IngredientList">
                <thead>
                  <tr className="IngredientList__labels">
                    <th></th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Ingredient</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.foods.map(food => {
                    return <Ingredient as="tr" food={food} key={food.item.id} />
                  })}
                </tbody>
              </table>
              : null}
          </div>
          <div className="RecipeCard--back">
            <div className="RecipeCard__tittle">
              <PieChart className="tittle-icons" />
              <span>Nutrients</span>
              <List className="tittle-btns" onClick={() => this.setState({ flipped: false })} />
            </div>
            {this.state.chartjs !== null ?
              <div className="RecipeCard__PieChart">
                <Pie data={this.state.chartjs.data} options={this.state.chartjs.options} height={220} />
              </div>
              :
              <div className="nofoods_message">
                <span>No nutritional information to show</span>
                <span>Please add some ingredients first</span>
              </div>
            }
          </div>
          <IngredientSearch show={this.state.showSearch} setShow={this.setShow} addFood={this.addFood} />
        </div>
      </div>
    )
  }
}

export default RecipeCard;
