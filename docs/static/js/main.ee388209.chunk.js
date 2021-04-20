(this.webpackJsonpgroceries=this.webpackJsonpgroceries||[]).push([[0],{28:function(e,t,a){},29:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var s=a(1),r=a(2),n=a.n(r),i=a(22),c=a.n(i),o=(a(28),a(7)),l=a(10),d=a(9),u=a(13),_=(a(29),a(38),a(40)),m=a(41),j=function(e){return Object(s.jsxs)("div",{className:"section",children:[Object(s.jsxs)("div",{className:"section__label",children:[Object(s.jsx)("h1",{id:"name",children:e.name.toUpperCase()}),Object(s.jsx)("button",{className:"btn-synched "+(e.synched?"--synched ":""),onClick:e.synched?null:e.saveState,children:e.synched?"SYNCHED":"CHANGES"}),Object(s.jsxs)("div",{className:"section-buttons",children:[Object(s.jsx)(_.a,{className:"section-buttons__edit "+(e.editable?"--editable ":""),size:"3rem",onClick:e.edit}),Object(s.jsx)(m.a,{className:"section-buttons__adder",size:"3rem",onClick:e.add})]})]}),Object(s.jsx)("div",{id:"divider"}),Object(s.jsx)("div",{className:"content-container "+e.className,children:e.children})]})},g=a(20),b=a(17),h=(a(33),a(44)),p=a(45),f=a(46),v=a(47),O=a(48),x=a(49),C=a(14),N=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).componentDidUpdate=function(e,t){t!==r.state&&r.props.setCustomMeasure({unit:r.state.user_unit,weight:r.state.user_weight,nutrients:r.state.user_nutri})},r.convert=function(e,t,a){var s=null;switch(t+a){case"grampound":s=.0022046*e;break;case"gramounce":s=.035275*e;break;case"poundgram":s=453.5924*e;break;case"ouncegram":s=28.34952*e;break;case"poundounce":s=16*e;break;case"ouncepound":s=e/16}return s="gram"===a?Math.round(s+.1):s.toFixed(2)},r.unitChange=function(e){var t=r.state.user_unit,a=r.state.user_weight,s=r.convert(a,t,e);r.setState({user_unit:e,user_weight:s})},r.weightChange=function(e){var t=e;"gram"!==r.state.user_unit&&(t=r.convert(e,r.state.user_unit,"gram"));for(var a=t/r.props.measure.weight_g,s={},n=0,i=Object.entries(r.props.measure.nutrients);n<i.length;n++){var c=Object(C.a)(i[n],2),o=c[0],l=c[1];s[o]=l*a}r.setState({user_weight:e,user_nutri:s})},r.render=function(){return Object(s.jsxs)("li",{className:r.props.className,children:[Object(s.jsxs)("div",{className:"weight",children:[Object(s.jsx)("input",{type:"number",value:r.state.user_weight,onChange:function(e){return r.weightChange(e.target.value)}}),Object(s.jsxs)("select",{defaultValue:r.state.user_unit,onChange:function(e){return r.unitChange(e.target.value)},children:[Object(s.jsx)("option",{value:"gram",children:"g"}),Object(s.jsx)("option",{value:"pound",children:"lb"}),Object(s.jsx)("option",{value:"ounce",children:"oz"})]})]}),Object(s.jsx)("img",{src:r.props.thumbnail,alt:"thumbnail"}),Object(s.jsx)("div",{className:"name",children:r.props.name}),Object(s.jsx)("div",{className:"delete-food "+(r.props.edit?"":"hide"),onClick:r.props.deleteSelf,children:Object(s.jsx)(_.a,{})})]})},r.state={user_unit:r.props.measure.user?r.props.measure.user.unit:"gram",user_weight:r.props.measure.user?r.props.measure.user.weight:r.props.measure.weight_g,user_nutri:r.props.measure.user?r.props.measure.user.nutrients:r.props.measure.nutrients},r}return a}(r.Component),y=(a(34),a(35),a(42)),S=a(43),k=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).incrementServes=function(e){var t=r.state.serves+e;t<1&&(t=1),r.props.updateServings(t),r.setState({serves:t})},r.getCalories=function(e){return Math.ceil(9*e.totalFats+4*e.totalProtiens+4*e.totalCarbs)},r.getAllNutrients=function(e){var t={};return e.forEach((function(e){var a=e.user?e.user.nutrients:e.nutrients;Object.keys(a).forEach((function(e){t.hasOwnProperty(e)?t[e]+=a[e]:t[e]=a[e]}))})),t},r.getDailyValue=function(e){var t={totalFats:0,totalCarbs:0,sattransfat_g:0,cholesterol_mg:0,sodium_mg:0,fiber_g:0,vataminA_re:0,vitaminC_mg:0,calcium_mg:0,iron_mg:0};return e.forEach((function(e){var a=e.user?e.user.nutrients:e.nutrients;t.totalFats+=(a.totalFats?a.totalFats:0)/65,t.totalCarbs+=(a.totalCarbs?a.totalCarbs:0)/300,t.sattransfat_g+=((a.fattyAcids_satur_g?a.fattyAcids_satur_g:0)+(a.fattyAcids_trans_g?a.fattyAcids_trans_g:0))/20,t.cholesterol_mg+=(a.cholesterol_mg?a.cholesterol_mg:0)/300,t.sodium_mg+=(a.sodium_mg?a.sodium_mg:0)/2400,t.fiber_g+=(a.fiber_g?a.fiber_g:0)/25,t.vataminA_re+=(a.vitaminA_RAE_ug?a.vitaminA_RAE_ug:0)/1e3,t.vitaminC_mg+=(a.vitaminC_mg?a.vitaminC_mg:0)/60,t.calcium_mg+=(a.calcium_mg?a.calcium_mg:0)/1100,t.iron_mg+=(a.iron_mg?a.iron_mg:0)/14})),t},r.HR=function(e){var t=e.thin?"HR--thin ":e.thick?"HR--thick ":"",a=e.light?"light ":"";return Object(s.jsx)("div",{className:"HR "+t+a})},r.Nutrient=function(e){return Object(s.jsxs)("span",{className:"nutrient "+(e.className?e.className:""),children:[Object(s.jsxs)("span",{style:e.bold?{fontWeight:"bold"}:null,children:[e.name," "]}),Object(s.jsxs)("span",{children:[e.value?Math.ceil(e.value/r.state.serves):0," ",e.unit]}),e.dailyValue?Object(s.jsxs)("span",{className:"dpercent",children:[Math.ceil(e.dailyValue/r.state.serves*100),"%"]}):null]})},r.render=function(){var e=r.HR,t=r.Nutrient,a=r.getAllNutrients(r.props.foods),n=r.getDailyValue(r.props.foods),i=r.state.lang_fr?"Valeur nutritive":"Nutrition Facts",c=r.state.lang_fr?"portions par recette":"servings per recipe",o=r.state.lang_fr?"valeur quotidienne":"Daily Value",l=r.state.lang_fr?"Lapides":"Fat",d=r.state.lang_fr?"satur\xe9s":"Saturated",u=r.state.lang_fr?"+ trans":"+ Trans",_=r.state.lang_fr?"Glucides":"Carbohydrate",m=r.state.lang_fr?"Fibres":"Fibre",j=r.state.lang_fr?"Sucres":"Sugars",g=r.state.lang_fr?"Prot\xe9ines":"Protien",b=r.state.lang_fr?"Cholest\xe9rol":"Cholesterol",h=r.state.lang_fr?"Fer":"Iron";return Object(s.jsxs)("div",{className:"NutritionLabel",onClick:function(){return console.log(r.props.foods)},children:[Object(s.jsxs)("div",{className:"header",children:[r.props.langToggle?Object(s.jsxs)("div",{className:"bling-toggle",onClick:function(){return r.setState({lang_fr:!r.state.lang_fr})},children:[Object(s.jsx)("span",{className:"bling-toggle__en "+(r.state.lang_fr?"":" selected"),children:"EN"}),"/",Object(s.jsx)("span",{className:"bling-toggle__fr "+(r.state.lang_fr?" selected":""),children:"FR"})]}):null,Object(s.jsx)("h1",{children:i})]}),Object(s.jsxs)("div",{className:"serving-size",children:[Object(s.jsx)("button",{className:"valbtn-minus",onClick:function(){return r.incrementServes(-1)},children:Object(s.jsx)(y.a,{})}),Object(s.jsx)("span",{className:"value",children:r.state.serves}),Object(s.jsx)("button",{className:"valbtn-plus",onClick:function(){return r.incrementServes(1)},children:Object(s.jsx)(S.a,{})}),Object(s.jsxs)("span",{className:"text",children:[" ",c]})]}),Object(s.jsx)(e,{}),Object(s.jsxs)("div",{className:"calories-dlabel",children:[Object(s.jsxs)("div",{className:"calories",children:[Object(s.jsxs)("span",{children:["Calories ",Math.ceil(r.getCalories(a)/r.state.serves)]}),Object(s.jsx)(e,{thick:!0})]}),Object(s.jsxs)("span",{className:"dpercent-label",children:["% ",o,"*"]})]}),Object(s.jsxs)("div",{className:"NL__totalFats",children:[Object(s.jsx)(t,{bold:!0,name:l,unit:"g",value:a.totalFats,dailyValue:n.totalFats}),Object(s.jsxs)("div",{className:"breakdown",children:[Object(s.jsxs)("div",{className:"breakdown__values",children:[Object(s.jsx)(t,{name:d,unit:"g",value:a.fattyAcids_satur_g}),Object(s.jsx)(t,{name:u,unit:"g",value:a.fattyAcids_trans_g})]}),Object(s.jsxs)("span",{className:"dpercent",children:[Math.ceil(n.sattransfat_g/r.state.serves*100),"%"]})]})]}),Object(s.jsx)(e,{thin:!0}),Object(s.jsxs)("div",{className:"NL__totalCarbs",children:[Object(s.jsx)(t,{bold:!0,name:_,unit:"g",value:a.totalCarbs,dailyValue:n.totalCarbs}),Object(s.jsx)("div",{className:"breakdown",children:Object(s.jsxs)("div",{className:"breakdown__values",children:[Object(s.jsx)(t,{name:m,unit:"g",value:a.fiber_g}),Object(s.jsx)(t,{name:j,unit:"g",value:a.totalSugars_g})]})})]}),Object(s.jsx)(e,{thin:!0}),Object(s.jsx)(t,{className:"NL__totalProtiens",bold:!0,name:g,unit:"g",value:a.totalProtiens}),Object(s.jsx)(e,{thin:!0}),Object(s.jsx)(t,{bold:!0,name:b,unit:"mg",value:a.cholesterol_mg,dailyValue:n.cholesterol_mg}),Object(s.jsx)(e,{thin:!0}),Object(s.jsx)(t,{bold:!0,name:"Sodium",unit:"mg",value:a.sodium_mg,dailyValue:n.sodium_mg}),Object(s.jsx)(e,{thick:!0}),Object(s.jsx)(t,{name:"Potassium",unit:"mg",value:a.potassium_mg}),Object(s.jsx)(e,{thin:!0}),Object(s.jsx)(t,{name:"Calcium",unit:"mg",value:a.calcium_mg,dailyValue:n.calcium_mg}),Object(s.jsx)(e,{thin:!0}),Object(s.jsx)(t,{name:h,unit:"mg",value:a.iron_mg,dailyValue:n.iron_mg}),Object(s.jsx)(e,{thick:!0}),r.state.lang_fr?Object(s.jsxs)("span",{style:{fontSize:"0.8rem"},children:[Object(s.jsx)("span",{style:{fontWeight:"bold"},children:"*"})," 5% ou moins c'est",Object(s.jsx)("span",{style:{fontWeight:"bold"},children:" peu"}),", 15% ou plus c'est",Object(s.jsx)("span",{style:{fontWeight:"bold"},children:" beaucoup"})]}):Object(s.jsxs)("span",{style:{fontSize:"0.8rem"},children:[Object(s.jsx)("span",{style:{fontWeight:"bold"},children:"*"})," 5% or less is",Object(s.jsx)("span",{style:{fontWeight:"bold"},children:" a little"}),", 15% or more is",Object(s.jsx)("span",{style:{fontWeight:"bold"},children:" a lot"})]})]})},r.state={serves:r.props.serves?r.props.serves:1,lang_fr:!1},r}return a}(r.Component),F=(a(39),function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).clearSearch=function(){setTimeout((function(){r.setState({searchTerms:""})}),300)},r.delayedSearch=function(e){r.setState({searchTerms:e}),""!==e&&(void 0!==r.timeoutID&&clearTimeout(r.timeoutID),r.timeoutID=setTimeout((function(){r.instantSearch(e)}),400))},r.instantSearch=function(e){u.a.app().functions("us-east4").httpsCallable("searchInstantNX")({search:e}).then((function(e){return r.props.onResult(e.data)})).catch((function(e){return console.error(e)}))},r.render=function(){return Object(s.jsx)("input",{type:"text",className:r.props.className,placeholder:"Search Food Here...",onChange:function(e){return r.delayedSearch(e.target.value)},value:r.state.searchTerms})},r.state={searchTerms:""},r}return a}(r.Component)),w=function e(t){var a=this;return Object(o.a)(this,e),this.cleanCommonFood=function(e){return{isBranded:!1,isCommon:!0,displayName:a.constructor.capitalizeEachWord(e.food_name),item:{name:e.tag_name,id:e.tag_id},foodName:e.food_name,servingQty:e.serving_qty,servingUnit:e.serving_unit,servingWeight:{g:e.serving_weight_grams},photo:e.photo,nutrients:a.calcFoodNutrition(e.full_nutrients)}},this.cleanBrandedFood=function(e){return{isBranded:!0,isCommon:!1,displayName:a.constructor.capitalizeEachWord(e.food_name),brand:{name:e.brand_name,id:e.nix_brand_id},item:{name:e.brand_name_item_name,id:e.nix_item_id},foodName:e.food_name,servingQty:e.serving_qty,servingUnit:e.serving_unit,servingWeight:{g:e.serving_weight_grams},photo:e.photo,nutrients:a.calcFoodNutrition(e.full_nutrients)}},this.calcFoodNutrition=function(e){var t={};return t={totalCarbs:0,totalFats:0,totalProtiens:0},e.forEach((function(e){var a=void 0;203===e.attr_id&&(a="totalProtiens"),204===e.attr_id&&(a="totalFats"),205===e.attr_id&&(a="totalCarbs"),207===e.attr_id&&(a="ash_g"),208===e.attr_id&&(a="energy_kcal"),209===e.attr_id&&(a="starch_g"),210===e.attr_id&&(a="sucrose_g"),211===e.attr_id&&(a="glucose_g"),212===e.attr_id&&(a="fructose_g"),213===e.attr_id&&(a="lactose_g"),214===e.attr_id&&(a="maltose_g"),221===e.attr_id&&(a="ethylAlcohol_g"),255===e.attr_id&&(a="water_g"),257===e.attr_id&&(a="adjustedProtien_g"),262===e.attr_id&&(a="caffeine_mg"),263===e.attr_id&&(a="theobromine_mg"),268===e.attr_id&&(a="energy_kj"),269===e.attr_id&&(a="totalSugars_g"),287===e.attr_id&&(a="galactose_g"),291===e.attr_id&&(a="fiber_g"),301===e.attr_id&&(a="calcium_mg"),303===e.attr_id&&(a="iron_mg"),304===e.attr_id&&(a="magnesium_mg"),305===e.attr_id&&(a="phosphorus_mg"),306===e.attr_id&&(a="potassium_mg"),307===e.attr_id&&(a="sodium_mg"),309===e.attr_id&&(a="zinc_mg"),312===e.attr_id&&(a="copper_mg"),313===e.attr_id&&(a="fluoride_ug"),315===e.attr_id&&(a="manganese_mg"),317===e.attr_id&&(a="selenium_ug"),318===e.attr_id&&(a="vitaminA_IU"),319===e.attr_id&&(a="retinol_ug"),320===e.attr_id&&(a="vitaminA_RAE_ug"),321===e.attr_id&&(a="caroteneBeta_ug"),322===e.attr_id&&(a="caroteneAlpha_ug"),323===e.attr_id&&(a="vitaminE_mg"),324===e.attr_id&&(a="vitaminD_IU"),325===e.attr_id&&(a="vitaminD2_ug"),326===e.attr_id&&(a="vitaminD3_ug"),328===e.attr_id&&(a="vitaminD2D3_ug"),334===e.attr_id&&(a="cryptoxanthinBeta_ug"),337===e.attr_id&&(a="lycopene_ug"),338===e.attr_id&&(a="lutein_zeaxanthin_ug"),341===e.attr_id&&(a="bTocopherol_mg"),342===e.attr_id&&(a="gTocopherol_mg"),343===e.attr_id&&(a="dTocopherol_mg"),344===e.attr_id&&(a="aTocotrienol_mg"),345===e.attr_id&&(a="bTocotrienol_mg"),346===e.attr_id&&(a="gTocotrienol_mg"),347===e.attr_id&&(a="dTocotrienol_mg"),401===e.attr_id&&(a="vitaminC_mg"),404===e.attr_id&&(a="thiamin_mg"),405===e.attr_id&&(a="riboflavin_mg"),406===e.attr_id&&(a="niacin_mg"),410===e.attr_id&&(a="pantothenicAcid_mg"),415===e.attr_id&&(a="vitaminB6_mg"),417===e.attr_id&&(a="folate_ug"),418===e.attr_id&&(a="VitaminB12_ug"),421===e.attr_id&&(a="choline_mg"),428===e.attr_id&&(a="menaquinone4_ug"),429===e.attr_id&&(a="dihydrophylloquinone_ug"),430===e.attr_id&&(a="vitaminK_ug"),431===e.attr_id&&(a="folicAcid_ug"),432===e.attr_id&&(a="folate_food_ug"),435===e.attr_id&&(a="folate_DFE_ug"),454===e.attr_id&&(a="betaine_mg"),501===e.attr_id&&(a="tryptophan_g"),502===e.attr_id&&(a="threonine_g"),503===e.attr_id&&(a="isoleucine_g"),504===e.attr_id&&(a="leucine_g"),505===e.attr_id&&(a="lysine_g"),506===e.attr_id&&(a="methionine_g"),507===e.attr_id&&(a="cystine_g"),508===e.attr_id&&(a="phenylalanine_g"),509===e.attr_id&&(a="tyrosine_g"),510===e.attr_id&&(a="valine_g"),511===e.attr_id&&(a="arginine_g"),512===e.attr_id&&(a="histidine_G"),513===e.attr_id&&(a="alanine_g"),514===e.attr_id&&(a="asparticAcid_g"),515===e.attr_id&&(a="glutamicAcid_g"),516===e.attr_id&&(a="glycine_g"),517===e.attr_id&&(a="proline_g"),518===e.attr_id&&(a="serine_g"),521===e.attr_id&&(a="hydroxyproline_g"),539===e.attr_id&&(a="sugar_added_g"),573===e.attr_id&&(a="vitaminE_added_mg"),578===e.attr_id&&(a="vitaminB12_added_ug"),601===e.attr_id&&(a="cholesterol_mg"),605===e.attr_id&&(a="fattyAcids_trans_g"),606===e.attr_id&&(a="fattyAcids_satur_g"),a?t[a]=e.value:t[e.attr_id]=e.value})),t},t.brand_name||t.brand_name_item_name||t.brand_type?this.cleanBrandedFood(t):this.cleanCommonFood(t)};w.capitalizeEachWord=function(e){if("string"!==typeof e)return e;var t=e.split(" "),a=[];return t.forEach((function(e){a.push(e.charAt(0).toUpperCase()+e.slice(1))})),a.join(" ")};var R=w,A=function(e){var t=e.ratio.f+e.ratio.c+e.ratio.p,a=e.ratio.f/t,n=e.ratio.c/t,i=e.ratio.p/t,c=Object(r.useState)(0),o=Object(C.a)(c,2),l=o[0],d=o[1],u=Object(r.useState)(0),_=Object(C.a)(u,2),m=_[0],j=_[1],g=Object(r.useState)(0),b=Object(C.a)(g,2),h=b[0],p=b[1],f=Object(r.useRef)();return Object(r.useEffect)((function(){d(f.current.offsetWidth*a),j(f.current.offsetWidth*n),p(f.current.offsetWidth*i)}),[t,a,n,i]),Object(s.jsxs)("div",{ref:f,className:"macroRatio",children:[Object(s.jsx)("div",{className:"macroRatio__f",style:{width:l||0}}),Object(s.jsx)("div",{className:"macroRatio__p",style:{width:h||0}}),Object(s.jsx)("div",{className:"macroRatio__c",style:{width:m||0}})]})},E=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).componentDidUpdate=function(e,t){var a=!1;t.foods!==r.state.foods&&(a=!0),t.serves!==r.state.serves&&(a=!0),a&&r.props.updateCard(r.state)},r.addFood=function(e){var t=new R(e),a=Object(b.a)(r.state.foods);a.push(t),r.searchInputRef.current.clearSearch(),r.setState({foods:a,showSearch:!1,searchResult:null})},r.deleteFood=function(e){var t=Object(b.a)(r.state.foods);t.splice(e,1),r.setState({foods:t})},r.updateName=function(){r.state.name!==r.props.name&&r.props.updateCard(r.state),r.setState({editable:!1})},r.discardChanges=function(){r.setState({editable:!1,name:r.props.name})},r.setCustomMeasures=function(e,t){var a=Object(b.a)(r.state.foods);a[e]=Object(g.a)(Object(g.a)({},r.state.foods[e]),{},{user:t}),r.setState({foods:a})},r.flipToBack=function(){r.setState({flipped:!0})},r.onSearchResult=function(e){"ok"===e.status?r.setState({searchResult:e.message}):r.setState({searchResult:null})},r.cancelSearch=function(){r.searchInputRef.current.clearSearch(),r.setState({showSearch:!1,searchResult:null})},r.getMacros=function(){var e={f:0,c:0,p:0};return r.state.foods.forEach((function(t){e.f+=t.user?t.user.nutrients.totalFats:t.nutrients.totalFats,e.p+=t.user?t.user.nutrients.totalProtiens:t.nutrients.totalProtiens,e.c+=t.user?t.user.nutrients.totalCarbs:t.nutrients.totalCarbs})),e},r.render=function(){var e=r.getMacros();return Object(s.jsxs)("div",{className:"recipeCard-Container",children:[Object(s.jsx)("div",{className:"recipeCard__deleteOverlay "+(r.props.editable?"--editable ":""),children:Object(s.jsx)(_.a,{className:"recipeCard__deleteOverlay__delbutton",size:"10rem",onClick:r.props.deleteSelf})}),Object(s.jsxs)("div",{className:"recipeCard"+(r.state.flipped?" -flipped":""),children:[Object(s.jsxs)("div",{className:"recipeCard__front",children:[Object(s.jsxs)("div",{className:"recipeCard__navbar",children:[Object(s.jsx)(h.a,{className:"recipeCard__navbar__icon"}),r.state.editable?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("input",{className:"recipeCard__navbar__label -edit",type:"text",value:r.state.name,onChange:function(e){return r.setState({name:e.target.value})}}),Object(s.jsx)(p.a,{className:"recipeCard__navbar__button",onClick:r.updateName}),Object(s.jsx)(f.a,{className:"recipeCard__navbar__button",onClick:r.discardChanges})]}):Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("span",{className:"recipeCard__navbar__label",children:r.state.name}),Object(s.jsx)(v.a,{className:"recipeCard__navbar__button",onClick:function(){return r.setState({editable:!0})}}),Object(s.jsx)(O.a,{className:"recipeCard__navbar__button",onClick:r.flipToBack}),Object(s.jsx)(x.a,{className:"recipeCard__navbar__button",onClick:function(){return r.setState({showSearch:!0})}})]})]}),Object(s.jsx)("div",{className:"recipeCard__content",children:r.state.foods.length>0?Object(s.jsx)("ul",{className:"recipeCard__foodList",children:r.state.foods.map((function(e,t){return Object(s.jsx)(N,{edit:r.state.editable,className:"recipeCard__foodList__foodItem",name:e.displayName,thumbnail:e.photo.thumb,measure:{nutrients:e.nutrients,weight_g:e.servingWeight.g,user:!!e.user&&e.user},setCustomMeasure:function(e){return r.setCustomMeasures(t,e)},deleteSelf:function(){return r.deleteFood(t)},as:"li"},e.item.id+"_"+t)}))}):null}),Object(s.jsxs)("div",{className:"recipeCard__foodSearch "+(r.state.showSearch?"":"-hide "),children:[Object(s.jsxs)("div",{className:"recipeCard__foodSearch__input",children:[Object(s.jsx)(F,{onResult:function(e){return r.onSearchResult(e)},ref:r.searchInputRef}),Object(s.jsx)("button",{onClick:r.cancelSearch,children:Object(s.jsx)(f.a,{})})]}),Object(s.jsx)("span",{className:"attribution",children:"Powered By Nutritionix"}),Object(s.jsx)("div",{className:"recipeCard__foodSearch__results "+(r.state.searchResult?"":"no-results"),children:r.state.searchResult?Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("ul",{className:"result",children:[r.state.searchResult.common.map((function(e,t){return Object(s.jsxs)("li",{className:"result__food common",onClick:function(){return r.addFood(e)},children:[Object(s.jsx)("div",{className:"type common"}),Object(s.jsx)("img",{src:e.photo.thumb,alt:""}),Object(s.jsx)("span",{children:R.capitalizeEachWord(e.food_name)})]},"cfood_"+t)})),r.state.searchResult.branded.map((function(e,t){return Object(s.jsxs)("li",{className:"result__food branded",onClick:function(){return r.addFood(e)},children:[Object(s.jsx)("div",{className:"type branded"}),Object(s.jsx)("img",{src:e.photo.thumb,alt:""}),Object(s.jsx)("span",{children:R.capitalizeEachWord(e.food_name)})]},"bfood_"+t)}))]})}):null})]})]}),Object(s.jsxs)("div",{className:"recipeCard__back",children:[Object(s.jsxs)("div",{className:"recipeCard__navbar",children:[Object(s.jsx)(O.a,{className:"recipeCard__navbar__icon"}),Object(s.jsx)("span",{className:"recipeCard__navbar__label",children:"Nutrients"}),Object(s.jsx)(h.a,{className:"recipeCard__navbar__button",onClick:function(){return r.setState({flipped:!1})}})]}),Object(s.jsx)("div",{className:"recipeCard__content",children:r.state.foods.length>0?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(A,{ratio:e}),Object(s.jsx)(k,{serves:r.state.serves,updateServings:function(e){return r.setState({serves:e})},foods:r.state.foods,langToggle:!0})]}):Object(s.jsxs)("div",{className:"no-data",children:[Object(s.jsx)("span",{children:"No nutritional information to show"}),Object(s.jsx)("span",{children:"Please add some ingredients first"})]})})]})]})]})},r.searchInputRef=n.a.createRef(),r.state={name:r.props.name,foods:r.props.foods,serves:r.props.serves,flipped:!1,editable:!!r.props.edit,showSearch:!1,searchResult:null},r}return a}(r.Component),T=(a(36),function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).componentDidMount=function(){r.loadState()},r.addCard=function(){var e=Date.now(),t=r.state.cards;t[e]={name:"new card",foods:[],serves:1},r.setState({cards:t,synched:!1})},r.deleteCard=function(e){console.log(e);var t=r.state.cards;delete t[e],r.setState({cards:t,synched:!1})},r.updateCard=function(e,t){var a=r.state.cards;a[t]=e,r.setState({cards:a,synched:!1})},r.saveState=function(){var e=u.a.app().firestore(),t=r.state.cards;e.collection("user-recipes").doc("guest").set(t),r.setState({synched:!0})},r.loadState=function(){u.a.app().firestore().collection("user-recipes").doc("guest").get().then((function(e){r.setState({cards:e.data(),synched:!0})}))},r.render=function(){return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)(j,{className:"RecipeView",name:"Recipes",add:r.addCard,edit:function(){return r.setState({editable:!r.state.editable})},editable:r.state.editable,synched:r.state.synched,saveState:r.saveState,children:Object.keys(r.state.cards).length>0?Object.keys(r.state.cards).sort().reverse().map((function(e){return Object(s.jsx)(E,{name:r.state.cards[e].name,foods:r.state.cards[e].foods,serves:r.state.cards[e].serves,updateCard:function(t){return r.updateCard(t,e)},editable:r.state.editable,deleteSelf:function(){return r.deleteCard(e)}},e)})):null})})},r.state={cards:{},synched:!1,editable:!1},r}return a}(r.Component)),D={apiKey:"AIzaSyCcuvKmk2eMrEQUdgrEh0qa5MSb4VLAbtc",authDomain:"groceries-recipe-manager.firebaseapp.com",projectId:"groceries-recipe-manager",storageBucket:"groceries-recipe-manager.appspot.com",messagingSenderId:"1047671614579",appId:"1:1047671614579:web:7847fa553126e625830e06",measurementId:"G-1NEJ4T7QB9"};0===u.a.apps.length&&u.a.initializeApp(D);var I=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(o.a)(this,a);for(var r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))).render=function(){return Object(s.jsx)("div",{className:"app-container",children:Object(s.jsx)(T,{})})},e}return a}(r.Component),W=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,50)).then((function(t){var a=t.getCLS,s=t.getFID,r=t.getFCP,n=t.getLCP,i=t.getTTFB;a(e),s(e),r(e),n(e),i(e)}))};c.a.render(Object(s.jsx)(n.a.StrictMode,{children:Object(s.jsx)(I,{})}),document.getElementById("root")),W()}},[[37,1,2]]]);
//# sourceMappingURL=main.ee388209.chunk.js.map