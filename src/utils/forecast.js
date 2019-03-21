const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "https://api.darksky.net/forecast/7121d03cd6838d10f9220f38ca46e6e3/" +
        latitude +
        "," +
        longitude;

    request({ url, json: true }, (error, { body }) => {
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
                Math.round(body.currently.temperature) +
                " " +
                "degrees out with a " +
                ((body.currently.precipProbability) * 100) +
                "% chance of rain." + " " + "Currently the high for today is " + Math.round(body.daily.data[0].temperatureHigh) + " degrees with the low being " + Math.round(body.daily.data[0].temperatureLow) + " degrees."
            );
        }
    });
};

module.exports = forecast;
