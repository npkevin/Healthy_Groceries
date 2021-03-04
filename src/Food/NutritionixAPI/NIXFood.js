// Helper Class for dealing with Nutritionix raw data
class NIXFood {

  // Class Variables
  data = null

  constructor(food) {
    if (food.brand_name || food.brand_name_item_name || food.brand_type) {
      this.data = this.cleanBrandedFood(food);
    } else {
      this.data = this.cleanCommonFood(food);
    }
  }

  cleanCommonFood = (cFood) => {
    return {
      isBranded: false,
      isCommon: true,
      displayName: this.constructor.capitalizeEachWord(cFood.food_name),
      item: {
        name: cFood.tag_name,
        id: cFood.tag_id,
      },
      foodName: cFood.food_name,
      servingQty: cFood.serving_qty,
      servingUnit: cFood.serving_unit,
      servingWeight: {
        g: cFood.serving_weight_grams,
      },
      photo: cFood.photo,
      nutrients: this.calcFoodNutrition(cFood.full_nutrients),
    }
  }

  cleanBrandedFood = (bFood) => {
    return {
      isBranded: true,
      isCommon: false,
      displayName: this.constructor.capitalizeEachWord(bFood.food_name),
      brand: {
        name: bFood.brand_name,
        id: bFood.nix_brand_id,
      },
      item: {
        name: bFood.brand_name_item_name,
        id: bFood.nix_item_id,
      },
      foodName: bFood.food_name,
      servingQty: bFood.serving_qty,
      servingUnit: bFood.serving_unit,
      servingWeight: {
        g: bFood.serving_weight_grams,
      },
      photo: bFood.photo,
      nutrients: this.calcFoodNutrition(bFood.full_nutrients),
    }
  }

  /* Nutrional macros as defined by (Nutrionix API v2 Nutrient Mapping):
  https://docs.google.com/spreadsheets/d/14ssR3_vFYrVAidDLJoio07guZM80SMR5nxdGpAX-1-A/edit#gid=0
  nutrArr[].attr_id = 203(prots), 204(fats), 205(carbs) */
  // TODO: Finish all relavent nutrients
  calcFoodNutrition = (nutrArr) => {
    let nutrients = {};
    nutrients = {
      totalCarbs: 0,
      totalFats: 0,
      totalProtiens: 0,
    }
    nutrArr.forEach(nutrient => {
      switch (nutrient.attr_id) {
        // total protiens (g)
        case 203:
          nutrients.totalProtiens = nutrient.value; 
          break;
          // total fats (g)
        case 204:
          nutrients.totalFats = nutrient.value;
          break;
          // total carbs (g)
        case 205:
          nutrients.totalCarbs = nutrient.value;
          break;
        default:
          break;
      }
    })
    return nutrients;
  }

  static capitalizeEachWord = (words) => {
    if (typeof (words) !== "string") return words;
    let wordArr = words.split(" ");
    let captArr = [];
    wordArr.forEach(word => {
      captArr.push(word.charAt(0).toUpperCase() + word.slice(1));
    });
    return captArr.join(" ");
  }
}

export default NIXFood;