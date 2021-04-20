const functions = require("firebase-functions");
const https = require("https");

exports.searchInstantNX = functions.region('us-east4').https.onCall((data, ctx) => {

  if (!data.search) {
    return Promise.reject({
      status: "error",
      message: "Please provide search terms",
    })
  }

  const options = {
    host: "trackapi.nutritionix.com",
    port: 443,
    // &detailed=true: will give full nutritional values
    // &branded_type=2: 1=Restauraunt, 2=Groceries
    path: "/v2/search/instant?query=" + encodeURI(data.search) + "&detailed=true" + "&branded_type=2",
    method: "GET",
    headers: {
      "x-app-id": "NUTRITIONIX APP ID HERE",
      "x-app-key": "NUTRITIONIX API KEY HERE"
    }
  }

  let buff = "";

  let NX_Response = new Promise((resolve, reject) => {
    const request = https.request(options, response => {
      response.on("data", data => {
        buff += data;
      })
    })
    request.on("close", () => {
      resolve({
        status: "ok",
        message: JSON.parse(buff),
      })
    })
    request.on('error', error => {
      reject({
        status: "error",
        message: error,
      })
    })
    request.end();
  });

  return NX_Response;
})