const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var Mta = require('mta-gtfs');
mongoose.Promise = require('bluebird');
const Subways = require('./models/Subways.js');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

mongoose.connect('mongodb://heroku_dd83dt7l:1qcrmml3h73rgcgdjing0s868u@ds159776.mlab.com:59776/heroku_dd83dt7l', {
    useMongoClient: true,
}).then(function() {
    console.log('Mongo connected via mongoose')
});
var mta = new Mta({
    key: 'd95f1fb11f498729369198ba2d321657', // only needed for mta.schedule() method                 
});

app.get("/api/stops/:coordinates?", function(req, res) {
console.log(req.query.lng)
console.log(req.query.lat)
        var lat = parseFloat(req.query.lat)
        var lng = parseFloat(req.query.lng)
 
  
    Subways.aggregate([{
            $geoNear: {
                near: { 
                    type: 'Point',                  
                    coordinates: [lng, lat]       
                },
                spherical: true,
                distanceField: 'distance.dist',
                distanceMultiplier: 0.00062,
                num: 10
            }
        }],
        function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                /*console.log(doc)*/
                res.json(doc);
            }
        })
   
});
app.get('/api/status', function(req, res) {
    mta.status().then(function(doc) {
        console.log(doc);
        res.json(doc)
    });

})
// ------- route for selected train's schedule --------
app.get("/api/train", function(req, res) {
    var feed = 21;
    var station = "B41"

    /*console.log(req.query)
        var feed = parseInt(req.query.feed);
        var station = req.query.station;*/
    console.log(feed)
    console.log(station)

    /*if(req.query.station) {*/
mta.schedule("R43", 16).then(function (result) {
  console.log(result);
  res.json(result)
        });
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Next Train listening on ${port}`);