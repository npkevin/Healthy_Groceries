import React, { Component } from 'react'
import './NutritionLabel.css'
import './NutritionLabel-custom.css'
import { ChevronDown, ChevronUp } from 'react-feather'


// Follows https://www.inspection.gc.ca/food-label-requirements/labelling/industry/nutrition-labelling/nutrition-facts-table-formats/eng/1389209684841/1389210023155?chap=0#s2c2
// Canadian Standard
class NutritionLabel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // array of NIXFoods
      foods: this.props.children,
      serves: this.props.serves ? this.props.serves : 1,
      lang_fr: false,
    }
  }

  incrementServes = (val) => {
    let newVal = this.state.serves + val
    if (newVal < 1) newVal = 1
    this.props.updateServings(newVal)
    this.setState({ serves: newVal })
  }

  // 9cals/fat, 4cals/prot, 4cals/carbs
  getCalories = (calculatedNutrients) => {
    return Math.ceil(
      calculatedNutrients.totalFats * 9 +
      calculatedNutrients.totalProtiens * 4 +
      calculatedNutrients.totalCarbs * 4
      );
    }

    // Sum/Merge all the nurients together
    getAllNutrients = (foodArr) => {
      let tmpNutrients = {}
      foodArr.forEach(food => {
        const nutrients = food.user ? food.user.nutrients : food.nutrients
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
    
  getDailyValue = (foodArr) => {
    let tmpNutrients = {
      totalFats: 0,
      totalCarbs: 0,
      sattransfat_g: 0,
      cholesterol_mg: 0,
      sodium_mg: 0,
      fiber_g: 0,
      vataminA_re: 0,
      vitaminC_mg: 0,
      calcium_mg: 0,
      iron_mg: 0,
    }
    foodArr.forEach(food => {
      const nutrients = food.user ? food.user.nutrients : food.nutrients
      tmpNutrients.totalFats += nutrients.totalFats / 65
      tmpNutrients.totalCarbs += nutrients.totalCarbs / 300
      tmpNutrients.sattransfat_g += (nutrients.fattyAcids_satur_g + nutrients.fattyAcids_trans_g) / 20
      tmpNutrients.cholesterol_mg += nutrients.cholesterol_mg / 300
      tmpNutrients.sodium_mg += nutrients.sodium_mg / 2400
      tmpNutrients.fiber_g += nutrients.fiber_g / 25
      tmpNutrients.vataminA_re += nutrients.vitaminA_RAE_ug / 1000 // 1 ug RAE = 1 ug RE
      tmpNutrients.vitaminC_mg += nutrients.vitaminC_mg / 60
      tmpNutrients.calcium_mg += nutrients.calcium_mg / 1100
      tmpNutrients.iron_mg += nutrients.iron_mg / 14
    })
    return tmpNutrients
  }

  HR = (props) => {
    const size = props.thin ? "HR--thin " : props.thick ? "HR--thick " : ""
    const light = props.light ? "light " : ""
    return (
      <div className={"HR " + size + light} />
    )
  }

  // props: bold, name, value, unit
  Nutrient = (props) => {
    return (
      <span className={"nutrient " + (props.className ? props.className : "")}>
        <span style={props.bold ? { fontWeight: "bold" } : null}>{props.name} </span>
        <span>{props.value ? Math.ceil(props.value / this.state.serves) : 0} {props.unit}</span>
        {props.dailyValue ? <span className="dpercent">{Math.ceil((props.dailyValue / this.state.serves) * 100)}%</span> : null}
      </span>
    )
  }

  render = () => {
    const HR = this.HR
    const Nutrient = this.Nutrient
    const calculatedNutrients = this.getAllNutrients(this.state.foods)
    const calculatedDailyValue = this.getDailyValue(this.state.foods)

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
              <span className={"bling-toggle__en " + (this.state.lang_fr ? "" : " selected")}>EN</span>/
              <span className={"bling-toggle__fr " + (this.state.lang_fr ? " selected" : "")}>FR</span>
            </div>
            : null}
          <h1>{tittle_phrase}</h1>
        </div>
        <div className="serving-size">
          <button className="valbtn-minus" onClick={() => this.incrementServes(-1)}><ChevronDown /></button>
          <span className="value">{this.state.serves}</span>
          <button className="valbtn-plus" onClick={() => this.incrementServes(1)}><ChevronUp /></button>
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
        <div className="NL__totalFats">
          <Nutrient bold name={fat_phrase} unit="g" value={calculatedNutrients.totalFats} dailyValue={calculatedDailyValue.totalFats} />
          <div className="breakdown">
            <div className="breakdown__values">
              <Nutrient name={satur_phrase} unit="g" value={calculatedNutrients.fattyAcids_satur_g} />
              <Nutrient name={trans_phrase} unit="g" value={calculatedNutrients.fattyAcids_trans_g} />
            </div>
            <span className="dpercent">{Math.ceil((calculatedDailyValue.sattransfat_g / this.state.serves) * 100)}%</span>
          </div>
        </div>
        {/* ===== FATS END ===== */}
        <HR thin />



        {/* ===== CARBS START ===== */}
        <div className="NL__totalCarbs">
          <Nutrient bold name={carb_phrase} unit="g" value={calculatedNutrients.totalCarbs} dailyValue={calculatedDailyValue.totalCarbs} />
          <div className="breakdown">
            <div className="breakdown__values">
              <Nutrient name={fibre_phrase} unit="g" value={calculatedNutrients.fiber_g} />
              <Nutrient name={sugar_phrase} unit="g" value={calculatedNutrients.totalSugars_g} />
            </div>
          </div>
        </div>
        {/* ===== CARBS END ===== */}
        <HR thin />

        <Nutrient className="NL__totalProtiens" bold name={protien_phrase} unit="g" value={calculatedNutrients.totalProtiens} />
        <HR thin />
        <Nutrient bold name={cholest_phrase} unit="mg" value={calculatedNutrients.cholesterol_mg} dailyValue={calculatedDailyValue.cholesterol_mg} />
        <HR thin />
        <Nutrient bold name="Sodium" unit="mg" value={calculatedNutrients.sodium_mg} dailyValue={calculatedDailyValue.sodium_mg} />
        <HR thick />


        {/* Nurtrients of Public Intrest */}
        <Nutrient name="Potassium" unit="mg" value={calculatedNutrients.potassium_mg} />
        <HR thin />
        <Nutrient name="Calcium" unit="mg" value={calculatedNutrients.calcium_mg} dailyValue={calculatedDailyValue.calcium_mg} />
        <HR thin />
        <Nutrient name={iron_phrase} unit="mg" value={calculatedNutrients.iron_mg} dailyValue={calculatedDailyValue.iron_mg} />
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
