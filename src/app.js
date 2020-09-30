const path = require('path')  
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Define paths for express config
const pubicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(pubicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Anurag'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About me',
        name: 'Anurag'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the help page.',
        title: 'Help',
        name: 'Anurag'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { 
        if (error) {
            return res.send({ error })
        } 
            forecast(latitude, longitude, (errorForecast, dataForecast) => {
                if (errorForecast) {
                    return res.send({
                        error: errorForecast
                    })
                } 
                    res.send({
                        forecast: dataForecast,
                        location: location,
                    })
            })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404 Page',
        name: 'Anurag'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404 Page',
        name: 'Anurag'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})