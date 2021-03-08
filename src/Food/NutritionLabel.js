import React, { Component } from 'react'
import './NutritionLabel.css'


// Follows https://www.inspection.gc.ca/food-label-requirements/labelling/industry/nutrition-labelling/nutrition-facts-table-formats/eng/1389209684841/1389210023155?chap=0#s2c2
// Canadian Standard
// TODO: french support
class NutritionLabel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // array of NIXFoods
      foods: this.props.children,
      nutrients: this.getAllNutrients(this.props.children),
      serves: 1,
      lang_fr: false,
    }
  }

  incrementServes = (val) => {
    let newVal = this.state.serves + val
    if (newVal < 1) newVal = 1
    this.setState({ serves: newVal })
  }

  // Sum/Merge all the nurients together
  getAllNutrients = (foodArr) => {
    let tmpNutrients = {}
    foodArr.forEach(food => {
      Object.keys(food.nutrients).forEach(nutrient => {
        if (tmpNutrients.hasOwnProperty(nutrient)) {
          tmpNutrients[nutrient] += food.nutrients[nutrient]
        } else {
          tmpNutrients[nutrient] = food.nutrients[nutrient]
        }
      })
    })
    return tmpNutrients
  }

  // 9cals/fat, 4cals/prot, 4cals/carbs
  getCalories = () => {
    return Math.ceil(
      this.state.nutrients.totalFats * 9 +
      this.state.nutrients.totalProtiens * 4 +
      this.state.nutrients.totalCarbs * 4
    );
  }

  HR = (props) => {
    let size = ""
    if (props.thin) size = "HR--thin"
    if (props.thick) size = "HR--thick"
    return (
      <div className={"HR " + size} />
    )
  }

  // props: bold, name, value, unit
  Nutrient = (props) => {
    return (
      <span>
        <span style={props.bold ? {fontWeight: "bold"} : null}>{props.name} </span>
        {props.value ? Math.ceil(props.value / this.state.serves) : 0} {props.unit}
      </span>
    )
  }

  // TODO: Complete bilingual support (en/fr)
  render = () => {

    const HR = this.HR
    const Nutrient = this.Nutrient

    return (
      <div className="NutritionLabel">
        <div className="header" onClick={() => console.log(this.state)}>
          {this.props.langToggle ?
            <div className="bling-toggle" onClick={() => this.setState({ lang_fr: !this.state.lang_fr })}>
              <span className="bling-toggle__en" style={this.state.lang_fr ? null : { fontWeight: "bold" }}>EN</span>/
              <span className="bling-toggle__fr" style={this.state.lang_fr ? { fontWeight: "bold" } : null}>FR</span>
            </div>
            : null}
          <h1>Nutrition Facts</h1>
        </div>
        <div className="serving-size">
          <button className="valbtn-minus" onClick={() => this.incrementServes(-1)}>-</button>
          <span className="value">{this.state.serves}</span>
          <button className="valbtn-plus" onClick={() => this.incrementServes(1)}>+</button>
          <span className="text"> servings per recipe</span>
        </div>
        <HR />
        <div className="calories-dlabel">
          <div className="calories">
            <span>Calories {Math.ceil(this.getCalories() / this.state.serves)}</span>
            <HR thick />
          </div>
          <span className="dpercent-label">% Daily Value*</span>
        </div>


        {/* ===== FATS START ===== */}
        <div className="nutrient-breakdown">
          <div className="nutrient">
            <Nutrient bold name="Fat" unit="g" value={this.state.nutrients.totalFats} />
            <span className="dpercent">## %</span>
          </div>
          <div className="breakdown">
            <div className="breakdown__values">
              <Nutrient name="Saturated" unit="g" value={this.state.nutrients.fattyAcids_satur_g} />
              <Nutrient name="+ Trans" unit="g" value={this.state.nutrients.fattyAcids_trans_g}/>
            </div>
            <span className="dpercent">## %</span>
          </div>
        </div>
        {/* ===== FATS END ===== */}
        <HR thin />



        {/* ===== CARBS START ===== */}
        <div className="nutrient-breakdown">
          <div className="nutrient">
            <Nutrient bold name="Carbohydrate" unit="g" value={this.state.nutrients.totalCarbs} />
            <span className="dpercent">## %</span>
          </div>
          <div className="breakdown">
            <div className="breakdown__values">
              <Nutrient name="Fibre" unit="g" value={this.state.nutrients.fiber_g} />
              <Nutrient name="Sugar" unit="g" value={this.state.nutrients.totalSugars_g} />
            </div>
          </div>
        </div>
        {/* ===== CARBS END ===== */}
        <HR thin />

        <Nutrient bold name="Protien" unit="g" value={this.state.nutrients.totalProtiens}/>
        <HR thin />
        <Nutrient bold name="Cholesterol" unit="mg" value={this.state.nutrients.cholesterol_mg}/>
        <HR thin />
        <Nutrient bold name="Sodium" unit="mg" value={this.state.nutrients.sodium_mg}/>
        <HR thick />

        
        {/* Nurtrients of Public Intrest */}
        <Nutrient name="Potassium" unit="mg" value={this.state.nutrients.potassium_mg}/>
        <HR thin />
        <Nutrient name="Calcium" unit="mg" value={this.state.nutrients.calcium_mg}/>
        <HR thin />
        <Nutrient name="Iron" unit="mg" value={this.state.nutrients.iron_mg}/>
        <HR thick />

        {/* Daily Value Footnote */}
        <span style={{ fontSize: "0.8rem" }}>
          <span style={{ fontWeight: "bold" }}>*</span> 5% or less is
          <span style={{ fontWeight: "bold" }}> a little</span>, 15% or more is
          <span style={{ fontWeight: "bold" }}> a lot</span>
        </span>
      </div>
    )
  }
}

export default NutritionLabel;
