import React, { Component } from 'react'
import Select  from 'react-select'

class Food extends Component {

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

  render = () => {
    return (
      <li className={this.props.className} onClick={() => console.log(this.state.food)}>
        <div className="weight">
          <input type="number" value={this.state.user_weight} onChange={ e => this.setState({user_weight: e.target.value})}/>
          <select defaultValue={this.state.user_measure} onChange={e => this.convert(e)}>
            <option value="gram">g</option>
            <option value="pound">lb</option>
            <option value="ounce">oz</option>
          </select>
        </div>
        <img src={this.state.food.photo.thumb} alt="thumbnail"/>
        <div className="name">{this.state.food.displayName}</div>
      </li>
    )
  }
}

export default Food;
