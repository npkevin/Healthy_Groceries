import React, { Component } from 'react'
import { Trash2 } from 'react-feather';

class Food extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user_unit: this.props.measure.user ? this.props.measure.user.unit : "gram",
      user_weight: this.props.measure.user ? this.props.measure.user.weight : this.props.measure.weight_g,
      user_nutri: this.props.measure.user ? this.props.measure.user.nutrients : this.props.measure.nutrients,
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState !== this.state) {
      this.props.setCustomMeasure({
        unit: this.state.user_unit,
        weight: this.state.user_weight,
        nutrients: this.state.user_nutri,
      })
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
    const cur_weight = this.state.user_weight;
    const new_weight = this.convert(cur_weight, cur_unit, new_unit);

    this.setState({
      user_unit: new_unit,
      user_weight: new_weight,
    })
  }

  // Calculates nutrients by comparing current-weight to original-weight (grams)
  weightChange = (new_weight) => {
    let weightAsGrams = new_weight

    if (this.state.user_unit !== "gram")
      weightAsGrams = this.convert(new_weight, this.state.user_unit, "gram")

    const factor = weightAsGrams / this.props.measure.weight_g

    let user_nutrients = {}
    for (const [key, val] of Object.entries(this.props.measure.nutrients))
      user_nutrients[key] = val * factor

    this.setState({
      user_weight: new_weight,
      user_nutri: user_nutrients
    })
  }

  render = () => {
    return (
      <li className={this.props.className}>
        <div className="weight">
          <input type="number" value={this.state.user_weight} onChange={e => this.weightChange(e.target.value)} />
          <select defaultValue={this.state.user_unit} onChange={e => this.unitChange(e.target.value)}>
            <option value="gram">g</option>
            <option value="pound">lb</option>
            <option value="ounce">oz</option>
          </select>
        </div>
        <img src={this.props.thumbnail} alt="thumbnail" />
        <div className="name">{this.props.name}</div>
        <div className={"delete-food " + (this.props.edit ? "" : "hide")} onClick={this.props.deleteSelf}>
          <Trash2 />
        </div>
      </li>
    )
  }
}

export default Food;
