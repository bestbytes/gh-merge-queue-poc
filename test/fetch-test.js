var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var axios = require("axios");

var fetchWeather = require("../fetch-weather");
var rawWeatherData = require("../test-data/sample-weather-raw.json");

describe("Fetching data from OpenWeatherMap", function () {
  it("Should convert Fahrenheit to Celsius", async function () {
    sinon.stub(axios, "get").resolves({ data: rawWeatherData });
    const results = await fetchWeather.fetchWeather("London");
    expect(results).to.deep.equal({
      maxTemp: 17,
      minTemp: 14,
      rainFall: 2.29,
      cloudCover: 40,
    });
  });
});
