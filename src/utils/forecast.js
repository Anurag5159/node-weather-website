
const request = require('request')

const forecast = (latitude, longitude,  callback) => {
const url = 'http://api.weatherstack.com/current?access_key=fe14469e531ac4974263a2d214cdac8a&query=' + latitude + ',' + longitude

request({ url, json: true}, (error, {body}) => {
    if (error) {
        callback('Unable to connect to weather service')
    } else if (body.error) {
        callback('Unable to find location')
    } else {
        callback(undefined, {
            weatherDescriptions:body.current.weather_descriptions[0],
            temperature: body.current.temperature,
            feelsLike: body.current.feelslike
        })
    }
})
}

module.exports = forecast