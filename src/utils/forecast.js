const request= require('postman-request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fd073915c2959843de58ac18f821c104&query=' + latitude + ',' + longitude +'&units=m'

    request({ url, json:true }, function(error, {body}) {
        if (error) {
            callback('Unable to connect to data service',undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+". It is currently "+ body.current.temperature + "°C and it feels like "+ body.current.feelslike+"°C.")
        }
    })
}

module.exports = forecast