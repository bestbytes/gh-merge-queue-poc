const fetchWeather = require("./fetch-weather");
const commandLineArgs = require("command-line-args");

const options = commandLineArgs([
  { name: "location", alias: "l", type: String, defaultValue: "Berlin" },
]);
const location = options.location;

fetchWeather.fetchWeather(location).then((today) => {
  console.log(`Weather for ${location}: ${JSON.stringify(today)}`);
});
