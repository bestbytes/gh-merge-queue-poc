const axios = require("axios");
const appId = "aa0f1b0be45dca476178787f941c76dc"; // a managed key

async function fetchWeather(location) {
  const response = await axios
    .get("http://api.openweathermap.org/data/2.5/weather", {
      params: { q: location, appid: appId },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return Promise.reject(`failed to fetch weather for ${location}: ${error.message}`);
    });

  return processResults(response);
}

function processResults(allResults) {
  return {
    minTemp: kelvinToCelcius(allResults.main.temp_min),
    maxTemp: kelvinToCelcius(allResults.main.temp_max),
    rainFall: getRainFall(allResults.rain), // mm
    cloudCover: allResults.clouds.all, // percentage
  };
}

function kelvinToCelcius(kTemp) {
  return Math.round(kTemp - 273);
}

function getRainFall(rainObj) {
  if (!rainObj) return 0;
  return rainObj["1h"] || rainObj["2h"] || rainObj["3h"] || 0;
}

exports.fetchWeather = fetchWeather;
