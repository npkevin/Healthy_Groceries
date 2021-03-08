import React, { Component } from 'react'

class Food extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.props.food,
      user_weight: this.props.food.servingWeight.g,
      user_unit: "gram",
      user_nutri: this.props.food.nutrients,
    }
  }

  // This can be done better, inaccurate (but good enough for cooking?)
  convert = (value, from, to) => {
    let conv_val = null;
    switch (from + to) {
      case ("grampound"):
        conv_val = value * 0.0022046;
        break;
      case ("gramounce"):
        conv_val = value * 0.035275;
        break;
      case ("poundgram"):
        conv_val = value * 453.5924;
        break;
      case ("ouncegram"):
        conv_val = value * 28.34952;
        break;
      case ("poundounce"):
        conv_val = value * 16;
        break;
      case ("ouncepound"):
        conv_val = value / 16;
        break;
      default:
        break;
    }

    // Fractional grams are pointless for cooking. round it.
    // (+ 0.1 for traditional rounding)
    if (to === "gram")
      conv_val = Math.round(conv_val + 0.1);
    else
      conv_val = conv_val.toFixed(2);
    
    return conv_val
  }

  unitChange = (new_unit) => {
    const cur_unit = this.state.user_unit
    const weight = this.state.user_weight;
    const conv_val = this.convert(weight, cur_unit, new_unit);
    
    this.setState({
      user_unit: new_unit,
      user_weight: conv_val,
    })
  }

  // Calculates nutrients by comparing current-weight to original-weight (grams)
  weightChange = (new_weight) => {
    let weightAsGrams = new_weight

    if (this.state.user_unit !== "gram")
      weightAsGrams = this.convert(new_weight, this.state.user_unit, "gram")

    const multiplier = weightAsGrams / this.state.servingWeight.g

    let nutrients = {}
    Object.keys(this.state.nutrients).forEach( n => {
      nutrients[n] = this.state.nutrients[n] * multiplier
    })

    this.setState({
      user_weight: new_weight,
      user_nutri: nutrients
    })

    this.props.updateSelf(this.props.index, {
      unit: this.state.user_unit,
      weight: new_weight,
      nutrients: nutrients,
    })

  }

  render = () => {
    return (
      <li className={this.props.className}>
        <div className="weight">
          <input type="number"
            value={this.state.user_weight}
            onChange={ e => this.weightChange(e.target.value)}
          />
          <select defaultValue={this.state.user_unit} onChange={e => this.unitChange(e.target.value)}>
            <option value="gram">g</option>
            <option value="pound">lb</option>
            <option value="ounce">oz</option>
          </select>
        </div>
        <img src={this.state.photo.thumb} alt="thumbnail"/>
        <div className="name">{this.state.displayName}</div>
      </li>
    )
  }
}

export default Food;
