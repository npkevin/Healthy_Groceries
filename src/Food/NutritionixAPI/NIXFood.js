// Helper Class for dealing with Nutritionix raw data
class NIXFood {

  data = null;

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
    nutrArr.forEach(n => {
      let name = undefined;
      if (n.attr_id === 203) name = "totalProtiens"
      if (n.attr_id === 204) name = "totalFats"
      if (n.attr_id === 205) name = "totalCarbs"
      if (n.attr_id === 207) name = "ash_g"
      if (n.attr_id === 208) name = "energy_kcal"
      if (n.attr_id === 209) name = "starch_g"
      if (n.attr_id === 210) name = "sucrose_g"
      if (n.attr_id === 211) name = "glucose_g"
      if (n.attr_id === 212) name = "fructose_g"
      if (n.attr_id === 213) name = "lactose_g"
      if (n.attr_id === 214) name = "maltose_g"
      if (n.attr_id === 221) name = "ethylAlcohol_g"
      if (n.attr_id === 255) name = "water_g"
      if (n.attr_id === 257) name = "adjustedProtien_g"
      if (n.attr_id === 262) name = "caffeine_mg"
      if (n.attr_id === 263) name = "theobromine_mg"
      if (n.attr_id === 268) name = "energy_kj"
      if (n.attr_id === 269) name = "totalSugars_g"
      if (n.attr_id === 287) name = "galactose_g"
      if (n.attr_id === 291) name = "fiber_g"
      if (n.attr_id === 301) name = "calcium_mg"
      if (n.attr_id === 303) name = "iron_mg"
      if (n.attr_id === 304) name = "magnesium_mg"
      if (n.attr_id === 305) name = "phosphorus_mg"
      if (n.attr_id === 306) name = "potassium_mg"
      if (n.attr_id === 307) name = "sodium_mg"
      if (n.attr_id === 309) name = "zinc_mg"
      if (n.attr_id === 312) name = "copper_mg"
      if (n.attr_id === 313) name = "fluoride_ug"
      if (n.attr_id === 315) name = "manganese_mg"
      if (n.attr_id === 317) name = "selenium_ug"
      if (n.attr_id === 318) name = "vitaminA_IU"
      if (n.attr_id === 319) name = "retinol_ug"
      if (n.attr_id === 320) name = "vitaminA_RAE_ug"
      if (n.attr_id === 321) name = "caroteneBeta_ug"
      if (n.attr_id === 322) name = "caroteneAlpha_ug"
      if (n.attr_id === 323) name = "vitaminE_mg"
      if (n.attr_id === 324) name = "vitaminD_IU"
      if (n.attr_id === 325) name = "vitaminD2_ug"
      if (n.attr_id === 326) name = "vitaminD3_ug"
      if (n.attr_id === 328) name = "vitaminD2D3_ug"
      if (n.attr_id === 334) name = "cryptoxanthinBeta_ug"
      if (n.attr_id === 337) name = "lycopene_ug"
      if (n.attr_id === 338) name = "lutein_zeaxanthin_ug"
      if (n.attr_id === 341) name = "bTocopherol_mg"
      if (n.attr_id === 342) name = "gTocopherol_mg"
      if (n.attr_id === 343) name = "dTocopherol_mg"
      if (n.attr_id === 344) name = "aTocotrienol_mg"
      if (n.attr_id === 345) name = "bTocotrienol_mg"
      if (n.attr_id === 346) name = "gTocotrienol_mg"
      if (n.attr_id === 347) name = "dTocotrienol_mg"
      if (n.attr_id === 401) name = "vitaminC_mg"
      if (n.attr_id === 404) name = "thiamin_mg"
      if (n.attr_id === 405) name = "riboflavin_mg"
      if (n.attr_id === 406) name = "niacin_mg"
      if (n.attr_id === 410) name = "pantothenicAcid_mg"
      if (n.attr_id === 415) name = "vitaminB6_mg"
      if (n.attr_id === 417) name = "folate_ug"
      if (n.attr_id === 418) name = "VitaminB12_ug"
      if (n.attr_id === 421) name = "choline_mg"
      if (n.attr_id === 428) name = "menaquinone4_ug"
      if (n.attr_id === 429) name = "dihydrophylloquinone_ug"
      if (n.attr_id === 430) name = "vitaminK_ug"
      if (n.attr_id === 431) name = "folicAcid_ug"
      if (n.attr_id === 432) name = "folate_food_ug"
      if (n.attr_id === 435) name = "folate_DFE_ug"
      if (n.attr_id === 454) name = "betaine_mg"
      if (n.attr_id === 501) name = "tryptophan_g"
      if (n.attr_id === 502) name = "threonine_g"
      if (n.attr_id === 503) name = "isoleucine_g"
      if (n.attr_id === 504) name = "leucine_g"
      if (n.attr_id === 505) name = "lysine_g"
      if (n.attr_id === 506) name = "methionine_g"
      if (n.attr_id === 507) name = "cystine_g"
      if (n.attr_id === 508) name = "phenylalanine_g"
      if (n.attr_id === 509) name = "tyrosine_g"
      if (n.attr_id === 510) name = "valine_g"
      if (n.attr_id === 511) name = "arginine_g"
      if (n.attr_id === 512) name = "histidine_G"
      if (n.attr_id === 513) name = "alanine_g"
      if (n.attr_id === 514) name = "asparticAcid_g"
      if (n.attr_id === 515) name = "glutamicAcid_g"
      if (n.attr_id === 516) name = "glycine_g"
      if (n.attr_id === 517) name = "proline_g"
      if (n.attr_id === 518) name = "serine_g"
      if (n.attr_id === 521) name = "hydroxyproline_g"
      if (n.attr_id === 539) name = "sugar_added_g"
      if (n.attr_id === 573) name = "vitaminE_added_mg"
      if (n.attr_id === 578) name = "vitaminB12_added_ug"
      if (n.attr_id === 601) name = "cholesterol_mg"
      if (n.attr_id === 605) name = "fattyAcids_trans_g"
      if (n.attr_id === 606) name = "fattyAcids_satur_g"

      if (name) {
        nutrients[name] = n.value
      } else {
        nutrients[n.attr_id] = n.value
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