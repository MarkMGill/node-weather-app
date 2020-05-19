const axios = require('axios');

const getWeather = (url) => {
    return axios.get(url)
    .then(function (response) {
      // handle success
      const {temperature, precip, humidity, feelslike} = response.data.current;
      const {name, region, country} = response.data.location;
      const weatherDesc = response.data.current.weather_descriptions[0].toLowerCase();
      const forecast = `Currently it is ${weatherDesc}, ${temperature} degrees with ${precip} chance of rain.  The feels-like temperature is ${feelslike}, and humidity is ${humidity}.`;
      const location = `${name}, ${region}, ${country}`;
      return {location, forecast};
    })
    .catch(function (error) {
      // handle error
      console.log('shit!');
    })
    .finally(function () {
      // always executed
    });
  }

const geocode = (address) => {
    if(!address) {
      return console.log('Please enter address');
    }
    const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWFya21naWxsIiwiYSI6ImNrOG4yZXVsODB1OWEzaHFvb3MxdXJ4YXUifQ.KaD7kkYHIiwCRMX1nLmgYQ&limit=1`;
    return axios.get(mapboxURL)
        .then(function (response) {
            // handle success
            const lat = response.data.features[0].center[0];
            const long = response.data.features[0].center[1];
            const url = `http://api.weatherstack.com/current?access_key=626099cc0912f4b27addb4d0784c1011&query=${long},${lat}&units=f`;
            const weatherInfo = getWeather(url);
            return weatherInfo;
        })
        .catch(function (error) {
            // handle error
            console.log('shit!');
        })
        .finally(function () {
            // always executed
        });
}

module.exports = geocode;


