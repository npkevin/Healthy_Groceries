import React, { Component } from 'react'
import './NutritionLabel.css'
import './NutritionLabel-custom.css'


// Follows https://www.inspection.gc.ca/food-label-requirements/labelling/industry/nutrition-labelling/nutrition-facts-table-formats/eng/1389209684841/1389210023155?chap=0#s2c2
// Canadian Standard
// TODO: french support
class NutritionLabel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // array of NIXFoods
      foods: this.props.children,
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
      const nutrients = (food.user ? food.user.nutrients : food.nutrients)
      Object.keys(nutrients).forEach(n => {
        if (tmpNutrients.hasOwnProperty(n)) {
          tmpNutrients[n] += nutrients[n]
        } else {
          tmpNutrients[n] = nutrients[n]
        }
      })
    })
    return tmpNutrients
  }

  // 9cals/fat, 4cals/prot, 4cals/carbs
  getCalories = (calculatedNutrients) => {
    return Math.ceil(
      calculatedNutrients.totalFats * 9 +
      calculatedNutrients.totalProtiens * 4 +
      calculatedNutrients.totalCarbs * 4
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
      <span className={props.className}>
        <span style={props.bold ? {fontWeight: "bold"} : null}>{props.name} </span>
        {props.value ? Math.ceil(props.value / this.state.serves) : 0} {props.unit}
      </span>
    )
  }

  // TODO: Complete bilingual support (en/fr)
  render = () => {

    const HR = this.HR
    const Nutrient = this.Nutrient
    const calculatedNutrients = this.getAllNutrients(this.state.foods)

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
            <span>Calories {Math.ceil(this.getCalories(calculatedNutrients) / this.state.serves)}</span>
            <HR thick />
          </div>
          <span className="dpercent-label">% Daily Value*</span>
        </div>


        {/* ===== FATS START ===== */}
        <div className="nutrient-breakdown NL__totalFats">
          <div className="nutrient">
            <Nutrient bold name="Fat" unit="g" value={calculatedNutrients.totalFats} />
            <span className="dpercent">## %</span>
          </div>
          <div className="breakdown">
            <div className="breakdown__values">
              <Nutrient name="Saturated" unit="g" value={calculatedNutrients.fattyAcids_satur_g} />
              <Nutrient name="+ Trans" unit="g" value={calculatedNutrients.fattyAcids_trans_g}/>
            </div>
            <span className="dpercent">## %</span>
          </div>
        </div>
        {/* ===== FATS END ===== */}
        <HR thin />



        {/* ===== CARBS START ===== */}
        <div className="nutrient-breakdown NL__totalCarbs">
          <div className="nutrient">
            <Nutrient bold name="Carbohydrate" unit="g" value={calculatedNutrients.totalCarbs} />
            <span className="dpercent">## %</span>
          </div>
          <div className="breakdown">
            <div className="breakdown__values">
              <Nutrient name="Fibre" unit="g" value={calculatedNutrients.fiber_g} />
              <Nutrient name="Sugar" unit="g" value={calculatedNutrients.totalSugars_g} />
            </div>
          </div>
        </div>
        {/* ===== CARBS END ===== */}
        <HR thin />

        <Nutrient className="NL__totalProtiens" bold name="Protien" unit="g" value={calculatedNutrients.totalProtiens}/>
        <HR thin />
        <Nutrient bold name="Cholesterol" unit="mg" value={calculatedNutrients.cholesterol_mg}/>
        <HR thin />
        <Nutrient bold name="Sodium" unit="mg" value={calculatedNutrients.sodium_mg}/>
        <HR thick />

        
        {/* Nurtrients of Public Intrest */}
        <Nutrient name="Potassium" unit="mg" value={calculatedNutrients.potassium_mg}/>
        <HR thin />
        <Nutrient name="Calcium" unit="mg" value={calculatedNutrients.calcium_mg}/>
        <HR thin />
        <Nutrient name="Iron" unit="mg" value={calculatedNutrients.iron_mg}/>
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
