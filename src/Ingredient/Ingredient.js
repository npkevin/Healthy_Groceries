import React, { Component } from 'react'
import './Ingredient.css';

// An Ingredient can be a common food or a brand-named food
// (basically a data structure for nutritionix api)
class Ingredient extends Component {

  constructor(props) {
    super(props)
    this.state = {
      food: this.props.food,
      user_weight: this.props.food.servingWeight.g,
      user_measure: "gram",
      user_macros: this.props.food.nutrients.macros,
    }
  }

  // TODO: This can be done better, a lot of rounding/truncation inaccuracies
  convert = (e) => {
    const curUnit = this.state.user_measure
    const newUnit = e.target.value

    let convertedValue = null;
    switch (curUnit + newUnit) {
      case ("grampound"):
        convertedValue = this.state.user_weight / 454;
        break;
      case ("gramounce"):
        convertedValue = this.state.user_weight / 28.35;
        break;
      case ("poundgram"):
        convertedValue = this.state.user_weight * 454;
        break;
      case ("ouncegram"):
        convertedValue = this.state.user_weight * 28.35;
        break;
      case ("poundounce"):
        convertedValue = this.state.user_weight * 16;
        break;
      case ("ouncepound"):
        convertedValue = this.state.user_weight / 16;
        break;
      default:
        break;
    }
    this.setState({
      user_measure: newUnit,
      user_weight: convertedValue.toFixed(2)
    })
  }

  // TODO: update macros after user changes weight

  asTableRow = () => {
    const food = this.state.food
    return (
      <tr className="Ingredient">
        <td className="Ingredient__thumb">
          <img src={food.photo.thumb} alt="" onClick={() => console.log(food)} />
        </td>
        <td className="Ingredient__weight">
          <input type="number" value={this.state.user_weight} onChange={ e => this.setState({user_weight: e.target.value})} /></td>
        <td className="Ingredient__measure">
          <select defaultValue={this.state.user_measure} onChange={this.convert}>
            <option value="gram">g</option>
            <option value="pound">lb</option>
            <option value="ounce">oz</option>
          </select>
        </td>
        <td className="Ingredient__name">
          <span>{food.displayName}</span>
        </td>
      </tr>
    )
  }

  asListEl = () => {
    return null
  }

  render = () => {
    if (this.props.as === "tr") return this.asTableRow()
    if (this.props.as === "li") return this.asListEl()
    else return null
  }
}

export default Ingredient;
