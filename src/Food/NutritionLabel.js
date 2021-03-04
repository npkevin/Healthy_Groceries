import React, { Component } from 'react'
import './NutritionLabel.css'


// Follows https://www.inspection.gc.ca/food-label-requirements/labelling/industry/nutrition-labelling/nutrition-facts-table-formats/eng/1389209684841/1389210023155?chap=0#s2c2
// Canadian Standard
// TODO: french support
class NutritionLabel extends Component{

  constructor(props) {
    super(props)
    this.state = {
      // array of NIXFoods
      foods: this.props.children,
      nutrients: this.getAllNutrients(this.props.children),
    }
  }


  // Sum/Merge all the nurients together
  getAllNutrients = (foodArr) => {
    let tmpNutrients = {}
    foodArr.forEach(food => {
      Object.keys(food.nutrients).forEach( nutrient => {
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
  
  render = () => {

    return (
      <div className="NutritionLabel">
        <div>
          <div className="bling-toggle">
            <span className="bling-toggle__en" style={{fontWeight: "bold"}}>EN</span>/
            <span className="bling-toggle__fr">FR</span>
          </div>
          <h1>Nutrition Facts</h1>
        </div>
        <div className="serving-size">
          <span className="value">##</span><span> servings per recipe</span>
        </div>
        <hr/>
        <div className="calories-dlabel">
          <div className="calories">
            <span>Calories {this.getCalories()}</span>
            <hr className="thick"/>
          </div>
          <span className="dpercent-label">% Daily Value*</span>
        </div>
  
  
        {/* ===== FATS START ===== */}
        <div className="nutrient-breakdown">
          <div className="nutrient">
            <span><span style={{fontWeight: "bold"}}>Fat </span>{Math.ceil(this.state.nutrients.totalFats)} g</span>
            <span className="dpercent">## %</span>
          </div>
          <div className="breakdown">
            <div className="breakdown__values">
              <span>Saturated ## g</span>
              <span>+ Trans ## g</span>
            </div>
            <span className="dpercent">## %</span>
          </div>
        </div>
        {/* ===== FATS END ===== */}
        <hr className="thin"/>
  
  
  
        {/* ===== CARBS START ===== */}
        <div className="nutrient-breakdown">
          <div className="nutrient">
            <span><span style={{fontWeight: "bold"}}>Carbohydrate </span>{Math.ceil(this.state.nutrients.totalCarbs)} g</span>
            <span className="dpercent">## %</span>
          </div>
          <div className="breakdown">
            <div className="breakdown__values">
              <span>Fibre ## g</span>
              <span>Sugar ## g</span>
            </div>
          </div>
        </div>
        {/* ===== CARBS END ===== */}
        <hr className="thin"/>
  
  
        {/* Other Main Nutrients */}
        <span><span style={{fontWeight: "bold"}}>Protien </span>{Math.ceil(this.state.nutrients.totalProtiens)} g</span>
        <hr className="thin"/>
        <span><span style={{fontWeight: "bold"}}>Cholesterol </span>## g</span>
        <hr className="thin"/>
        <span><span style={{fontWeight: "bold"}}>Sodium </span>## g</span>
        <hr className="thick"/>
  
        {/* Other Nutrients */}
        <span>Potassium ## g</span>
        <hr className="thin"/>
        <span>Calcium ## g</span>
        <hr className="thin"/>
        <span>Iron ## g</span>
        <hr className="thick"/>
  
        {/* END OF NUTRITION LABEL */}
        <span style={{fontSize: "0.8rem"}}><span style={{fontWeight: "bold"}}>*</span> 5% or less is <span style={{fontWeight: "bold"}}>a little</span>, 15% or more is <span style={{fontWeight: "bold"}}>a lot</span></span>
      </div>
    )
  }
}

export default NutritionLabel;
