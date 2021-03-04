import React from 'react'
import './NutritionalLabel.css'


// Follows https://www.inspection.gc.ca/food-label-requirements/labelling/industry/nutrition-labelling/nutrition-facts-table-formats/eng/1389209684841/1389210023155?chap=0#s2c2
// Canadian Standard
// TODO: french support
const NutritionalLabel = (props) => {

  const foods = props.children

  // Sum all the nurients together
  let totalNutrients = {}
  foods.forEach(food => {
    Object.keys(food.nutrients).forEach( nutrient => {
      if (totalNutrients.hasOwnProperty(nutrient))
        totalNutrients[nutrient] += food.nutrients[nutrient]
      else 
        totalNutrients[nutrient] = food.nutrients[nutrient]
    })
  });

  // 9cals/fat, 4cals/prot, 4cals/carbs
  const calories = Math.round(
    totalNutrients.totalFats * 9 +
    totalNutrients.totalProtiens * 4 +
    totalNutrients.totalCarbs * 4
  );

  return (
    <div className="NutritionalLabel">
      <h1>Nutrition Facts</h1>
      <hr className="thin light"/>
      <div className="serving-size">
        {/* TODO: make value modifiable */}
        <span className="value">1</span> 
        <span> servings per recipe</span>
      </div>
      <div className="total-cals">
        <span className="label">Calories</span>
        <span className="value">{calories}</span>
      </div>
      <hr className="thick"/>
      <span style={{textAlign: "end", fontSize: "0.8rem", fontWeight: "bold"}}> % Daily Value*</span>
      <hr className="thin" style={{marginTop: "3px"}}/>

    </div>
  )
}

export default NutritionalLabel;
