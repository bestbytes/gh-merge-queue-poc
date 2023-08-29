var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var axios = require("axios");

var fetchWeather = require("../fetch-weather");
var rawWeatherData = require("../test-data/sample-weather-raw.json");

describe("Fetching data from OpenWeatherMap", function () {
  it("Should convert temp from K to C", async function () {
    sinon.stub(axios, "get").resolves({ data: rawWeatherData });
    const results = await fetchWeather.fetchWeather("London");
    expect(results.maxTemp).to.equal(17);
    expect(results.minTemp).to.equal(14);
  });
  it("Should map cloud coverage", async function () {
    const results = await fetchWeather.fetchWeather("London");
    expect(results.cloudCover).to.equal(55);
  });
});
