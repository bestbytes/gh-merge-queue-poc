/**
 * Created by alicia.sykes on 24/08/2015.
 */

/* Include testing tools */
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var request = require('request');

/* Include module(s) to test */
var fetchWeather = require('../fetch-weather');

/* Include sample data */
var rawWeatherData = require('../test-data/sample-weather-raw.json');

describe('Fetching data from OpenWeatherMap', function(){
    
    it('Should parse open weather response', function(done){
        // stub the request module:
        var stub = sinon.stub(request, 'get');
        stub.yields(null, {statusCode: 200}, rawWeatherData);
        fetchWeather.fetchWeather('London', function(results){
            console.log(JSON.stringify(results));
            expect(results).to.deep.equal({
                minTemp: 16,
                maxTemp: 19,
                rainFall: 0,
                cloudCover: 75
            });
            done();
        });
    });
});


