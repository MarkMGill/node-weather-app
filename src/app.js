const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
         title: 'Weather',
         name: 'Mark'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mark'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Mark'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mark',
        errorMessage: 'Help article not found.'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geocode(req.query.address).then(weatherInfo => {
        if(!weatherInfo) {
            res.send({
                error: 'Not a valid address'
            });
        } else {
            const {location, forecast} = weatherInfo;
            res.send({
                forecast,
                location,
                address: req.query.address
            });
        }
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mark',
        errorMessage: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('3000 yep');
});