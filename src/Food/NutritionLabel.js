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

    // Eng/Fre translations
    const tittle_phrase = this.state.lang_fr ? "Valeur nutritive" : "Nutrition Facts"
    const servings_phrase = this.state.lang_fr ? "portions par recette" : "servings per recipe"
    const dailyval_phrase = this.state.lang_fr ? "valeur quotidienne" : "Daily Value"
    const fat_phrase = this.state.lang_fr ? "Lapides" : "Fat"
    const satur_phrase = this.state.lang_fr ? "saturés" : "Saturated"
    const trans_phrase = this.state.lang_fr ? "+ trans" : "+ Trans"
    const carb_phrase = this.state.lang_fr ? "Glucides" : "Carbohydrate"
    const fibre_phrase = this.state.lang_fr ? "Fibres" : "Fibre"
    const sugar_phrase = this.state.lang_fr ? "Sucres" : "Sugars"
    const protien_phrase = this.state.lang_fr ? "Protéines" : "Protien"
    const cholest_phrase = this.state.lang_fr ? "Cholestérol" : "Cholesterol"
    const iron_phrase = this.state.lang_fr ? "Fer" : "Iron"

    return (
      <div className="NutritionLabel">
        <div className="header">
          {this.props.langToggle ?
            <div className="bling-toggle" onClick={() => this.setState({ lang_fr: !this.state.lang_fr })}>
              <span className="bling-toggle__en" style={this.state.lang_fr ? null : { textDecoration: "underline" }}>EN</span>/
              <span className="bling-toggle__fr" style={this.state.lang_fr ? { textDecoration: "underline" } : null}>FR</span>
            </div>
            : null}
          <h1>{tittle_phrase}</h1>
        </div>
        <div className="serving-size">
          <button className="valbtn-minus" onClick={() => this.incrementServes(-1)}>-</button>
          <span className="value">{this.state.serves}</span>
          <button className="valbtn-plus" onClick={() => this.incrementServes(1)}>+</button>
          <span className="text"> {servings_phrase}</span>
        </div>
        <HR />
        <div className="calories-dlabel">
          <div className="calories">
            <span>Calories {Math.ceil(this.getCalories(calculatedNutrients) / this.state.serves)}</span>
            <HR thick />
          </div>
          <span className="dpercent-label">% {dailyval_phrase}*</span>
        </div>


        {/* ===== FATS START ===== */}
        <div className="nutrient-breakdown NL__totalFats">
          <div className="nutrient">
            <Nutrient bold name={fat_phrase} unit="g" value={calculatedNutrients.totalFats} />
            <span className="dpercent">## %</span>
          </div>
          <div className="breakdown">
            <div className="breakdown__values">
              <Nutrient name={satur_phrase} unit="g" value={calculatedNutrients.fattyAcids_satur_g} />
              <Nutrient name={trans_phrase} unit="g" value={calculatedNutrients.fattyAcids_trans_g}/>
            </div>
            <span className="dpercent">## %</span>
          </div>
        </div>
        {/* ===== FATS END ===== */}
        <HR thin />



        {/* ===== CARBS START ===== */}
        <div className="nutrient-breakdown NL__totalCarbs">
          <div className="nutrient">
            <Nutrient bold name={carb_phrase} unit="g" value={calculatedNutrients.totalCarbs} />
            <span className="dpercent">## %</span>
          </div>
          <div className="breakdown">
            <div className="breakdown__values">
              <Nutrient name={fibre_phrase} unit="g" value={calculatedNutrients.fiber_g} />
              <Nutrient name={sugar_phrase} unit="g" value={calculatedNutrients.totalSugars_g} />
            </div>
          </div>
        </div>
        {/* ===== CARBS END ===== */}
        <HR thin />

        <Nutrient className="NL__totalProtiens" bold name={protien_phrase} unit="g" value={calculatedNutrients.totalProtiens}/>
        <HR thin />
        <Nutrient bold name={cholest_phrase} unit="mg" value={calculatedNutrients.cholesterol_mg}/>
        <HR thin />
        <Nutrient bold name="Sodium" unit="mg" value={calculatedNutrients.sodium_mg}/>
        <HR thick />

        
        {/* Nurtrients of Public Intrest */}
        <Nutrient name="Potassium" unit="mg" value={calculatedNutrients.potassium_mg}/>
        <HR thin />
        <Nutrient name="Calcium" unit="mg" value={calculatedNutrients.calcium_mg}/>
        <HR thin />
        <Nutrient name={iron_phrase} unit="mg" value={calculatedNutrients.iron_mg}/>
        <HR thick />

        {/* Daily Value Footnote */}
        {this.state.lang_fr ?
        <span style={{ fontSize: "0.8rem" }}>
          <span style={{ fontWeight: "bold" }}>*</span> 5% ou moins c'est
          <span style={{ fontWeight: "bold" }}> peu</span>, 15% ou plus c'est
          <span style={{ fontWeight: "bold" }}> beaucoup</span>
        </span>
        :
        <span style={{ fontSize: "0.8rem" }}>
          <span style={{ fontWeight: "bold" }}>*</span> 5% or less is
          <span style={{ fontWeight: "bold" }}> a little</span>, 15% or more is
          <span style={{ fontWeight: "bold" }}> a lot</span>
        </span>
        }
        
      </div>
    )
  }
}

export default NutritionLabel;
