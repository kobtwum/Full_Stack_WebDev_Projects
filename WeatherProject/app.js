const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

    const querry = req.body.cityName;
    const apiKey = "1b1555d7f05c08faac4db7df2b722ad5";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + querry + "&appid="+ apiKey +"&units=" + unit + "";

    https.get(url, function(response){
        // console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const city = weatherData.name;
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;

            res.write("<p>The weather is currently " + weatherDescription + ".<p>");
            res.write("<h1>The weather in " + city + " is " + temp + " degree Celcius.</h1>");
            res.write('<img src="http://openweathermap.org/img/wn/'+weatherIcon+'@2x.png">');
            res.send();

        });
    });

});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
})