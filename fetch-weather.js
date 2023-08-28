var request = require('request');

function fetchWeather(location, callback) {

    var appId = 'aa0f1b0be45dca476178787f941c76dc'; // a managed key
    var url = 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+appId;

    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (error) {
            console.error(error);
            console.error(response.statusCode, response.statusMessage);
            console.error(body);
        } else if (response.statusCode === 200) {
            callback(processResults(body));
        } else {
            console.error(response.statusCode, response.statusMessage);
        }
    });
}

function processResults(allResults){
    console.log(`Processing results for ${allResults.name}`);
    return {
        'minTemp'   : kelvinToCelcius(allResults.main.temp_min),
        'maxTemp'   : kelvinToCelcius(allResults.main.temp_max),
        'rainFall'  : getRainFall(allResults.rain),                 // mm
        'cloudCover': allResults.clouds.all                         // percentage
    }
}

function kelvinToCelcius(kTemp){
    return Math.round(kTemp - 273);
}

function getRainFall(rainObj){
    if (!rainObj) return 0;
    return (rainObj['1h'] || rainObj['2h'] || rainObj['3h'] || 0);
}

exports.fetchWeather = fetchWeather;
