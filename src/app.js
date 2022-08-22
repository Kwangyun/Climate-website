const path= require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')
//define path for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const port = process.env.PORT || 3000

//setup handlebar and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directroy to use
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name:'Kwangyun'
    })
})

app.get('/about', (req, res) => {
    res.render('about' , {
        title: 'Weather app',
        name:'Kwangyun'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Helpful Text',
        title: 'help',
        name: 'Kwangyun'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error){
            return res.send({error: 'error'})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    req.query
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res) => {
    res.send('my404 pagge')
})
app.get('*',(req,res) => {
    res.render('404', {   
        title: '404',
        name: 'Kwangyun',
        errorMessage: "page not found"
    })
})
app.listen(port, () => {
    console.log("server UP" + port)
});