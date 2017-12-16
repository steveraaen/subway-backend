const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
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

app.get("/api/stops", function(req, res) {
/*    console.log(parseFloat(req.query.coordinates))
    var lat = parseFloat(req.query.coordinates[1]).toFixed(6)
    var lng = parseFloat(req.query.coordinates[0]).toFixed(6)*/

   /* if(req.query.coordinates) {*/
Subways.aggregate([{
    $geoNear: {
        near: {
            /*type: "Point",*/
            coordinates: [40.874561, -73.909831]
        },
        spherical: true,
        distanceField: 'distance.dist',
        distanceMultiplier: 0.00062,
        num: 3 }
}],
function(error, doc) {
    if (error) {
        console.log(error);
    } else {
        console.log(doc)
        res.json(doc);
    }
})
 
});

// ------- route for selected train's schedule --------
app.get("/api/train/:station?", function(req, res) {
console.log(req.query)

    var feed = parseInt(req.query.feed);
    var station = req.query.station;
    console.log(feed)
    console.log(station)

if(req.query.station) {
mta.schedule(station, feed).then(function (result) {
  console.log(result);
  res.json(result)
        });

    }
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Next Train listening on ${port}`);



