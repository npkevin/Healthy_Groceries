import React from 'react'
import './NutritionalLabel.css'


// Follows https://www.inspection.gc.ca/food-label-requirements/labelling/industry/nutrition-labelling/nutrition-facts-table-formats/eng/1389209684841/1389210023155?chap=0#s2c2
// Canadian Standard
// TODO: french support
const NutritionalLabel = (props) => {

  const foods = props.children

  // Sum all the nurients together
  let nutrients = {}
  foods.forEach(food => {
    Object.keys(food.nutrients).forEach( nutrient => {
      if (nutrients.hasOwnProperty(nutrient))
      nutrients[nutrient] += food.nutrients[nutrient]
      else 
      nutrients[nutrient] = food.nutrients[nutrient]
    })
  });

  // 9cals/fat, 4cals/prot, 4cals/carbs
  const calories = Math.round(
    nutrients.totalFats * 9 +
    nutrients.totalProtiens * 4 +
    nutrients.totalCarbs * 4
  );

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
          <span>Calories {calories}</span>
          <hr className="thick"/>
        </div>
        <span className="dpercent-label">% Daily Value*</span>
      </div>
      <div className="nutrient-breakdown">
        <div className="nutrient">
          <span><span style={{fontWeight: "bold"}}>Fat </span>{Math.ceil(nutrients.totalFats)} g</span>
          <span className="dpercent">## %</span>
        </div>
        <div className="breakdown">
          <span>Saturated ## g</span>
          <span>+ Trans ## g</span>
        </div>
      </div>
      <hr className="thin"/>
      <div className="nutrient-breakdown">
        <div className="nutrient">
          <span><span style={{fontWeight: "bold"}}>Carbohydrate </span>{Math.ceil(nutrients.totalCarbs)} g</span>
          <span className="dpercent">## %</span>
        </div>
        <div className="breakdown">
          <span>Fibre ## g</span>
          <span>Sugar ## g</span>
        </div>
      </div>
      <hr className="thin"/>
      <span><span style={{fontWeight: "bold"}}>Protien </span>{Math.ceil(nutrients.totalProtiens)} g</span>
      <hr className="thin"/>
      <span><span style={{fontWeight: "bold"}}>Cholesterol </span>## g</span>
      <hr className="thin"/>
      <span><span style={{fontWeight: "bold"}}>Sodium </span>## g</span>
      <hr className="thick"/>
      <span>Potassium ## g</span>
      <hr className="thin"/>
      <span>Calcium ## g</span>
      <hr className="thin"/>
      <span>Iron ## g</span>


      {/* END OF NUTRITION LABEL */}
      <hr className="thick"/>
      <span style={{fontSize: "0.8rem"}}><span style={{fontWeight: "bold"}}>*</span> 5% or less is <span style={{fontWeight: "bold"}}>a little</span>, 15% or more is <span style={{fontWeight: "bold"}}>a lot</span></span>
    </div>
  )
}

export default NutritionalLabel;
