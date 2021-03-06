const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geocodeUrl).then((response)=>{
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error("Unable to find that address");
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl =`https://api.darksky.net/forecast/c42ba98b3200c9a73b00c0bd0ac43979/${lat},${lng}`;

  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response)=>{
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature} degrees, but it feels like ${apparentTemperature}.`);
}).catch((e)=>{
  if (e.code === 'ENOTFOUND'){
      console.log("Unable to connect to API server.");
  } else {
    console.log(e.message);
  }

})
