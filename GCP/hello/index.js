const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const request = require('request');

const API_key = process.env.API_KEY;
const city_name = 'Tokyo';
const lang = "ja";
const units = "metric";
const end_point = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=${units}&lang=${lang}&appid=${API_key}`;

const options = {
    url: end_point,
    method: "GET",
    json: true
};

app.use(express.static('public'));

app.get('/', (req, res) => {
    const name = process.env.NAME || 'World';
    res.send(`Hello ${name}!`);
});

app.get('/post', (req, res) => {
    const post = process.env.POST || 'No post';
    res.send(post);
})

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/wether', async(req, res) => {
    const data = await request(options, (error, res, body) => {
        const temperature = body.main.temp;
        console.log(`現在の${city_name}の気温は${temperature}度です。`);
        return temperature;
    });
    res.send(data)
})

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}`);
});