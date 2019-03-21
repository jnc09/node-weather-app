const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/7121d03cd6838d10f9220f38ca46e6e3/" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.daily.data.length === 0) {
      callback("Location does not exist!", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " " +
          "It is currently" +
          " " +
          body.currently.temperature +
          " " +
          "degrees out. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
