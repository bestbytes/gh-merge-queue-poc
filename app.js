var fetchWeather = require("./fetch-weather");
var commandLineArgs = require("command-line-args");

var options = commandLineArgs([
  { name: "location", alias: "l", type: String, defaultValue: "Berlin" },
]);
var location = options.location;

fetchWeather.fetchWeather(location, function (today) {
  console.log(`Weather for ${location}: ${JSON.stringify(today)}`);
});
