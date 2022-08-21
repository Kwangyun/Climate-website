const request= require('postman-request')
const geocode = (address, callback) => {
    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoia2t5dW4yNSIsImEiOiJjbDVqYnZucngwYW5yM2JyeXpjYnoxc3IxIn0.Hd8xzZ3I5Rir0kT99MUNPg&limit=1"
    request({ url: url, json:true}, function(error,{body}) {
        if (error) {
            callback('Unable to connect to loaction service', undefined)
        } else if (body.features.length===0) {
            callback("Uneable to find Locations. Try another search", undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode