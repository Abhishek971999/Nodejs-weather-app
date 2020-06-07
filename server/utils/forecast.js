const axios = require('axios');
const forecast = (location, callback) => {
  if (!location) console.log('Error: Provide a location');
  else {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b67c5e6d6c143bb60dff4f2b7ebe0f96`
      )
      .then((res) => {
        callback(undefined, res.data);
      })
      .catch((err) => {
        callback(err.response.data.message, undefined);
      });
  }
};
module.exports = forecast;
