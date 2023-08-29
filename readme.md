<h1 align="center">🛠️ Github merge queues demo</h1>
<br>

## Intro

This repo is used to discover how [Github merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue) work
by using a simple node.js project and Github Actions for CI.
The app pulls current weather data from OpenWeatherMap for a location.

---

# Merge Queue

There is a single queue (at the moment) per repo. 


### Running

- `npm start` will run the main file (app.js) and display results for Berlin
- `node app --location Paris` will run app.js for a custom location, e.g. Paris
- `npm test` will run the Mocha tests, output results and generate reports

---
