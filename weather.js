const request = require('request');

var getWeather = (lat,lng, callback) => {

  request({
    url: `https://api.darksky.net/forecast/c42ba98b3200c9a73b00c0bd0ac43979/${lat},${lng}`,
    json: true
  }, (error,response,body) => {
    if (!error && response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature
      });
    } else {
      callback("Unable to fetch weather");
    }
  })
}

module.exports.getWeather = getWeather;
