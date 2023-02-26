const request = require("request");
// const dotenv = require("dotenv");
require('dotenv').config();

const API_key = process.env.API_KEY;
const city_name = process.argv[2];
const lang = "ja";
const units = "metric";

const options = {
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=${units}&lang=${lang}&appid=${API_key}`,
    method: "GET",
    json: true
};

request(options, (error, res, body) => {
    const temperature = body.main.temp;
    console.log(`現在の${city_name}の気温は${temperature}度です。`);
});


