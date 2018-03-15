const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Mta = require('mta-gtfs');
mongoose.Promise = require('bluebird');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static('assets'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
mongoose.connect('mongodb://heroku_dd83dt7l:1qcrmml3h73rgcgdjing0s868u@ds159776.mlab.com:59776/heroku_dd83dt7l', {
    useMongoClient: true,
}).then(function() {
    console.log('Mongo connected via mongoose')
});
var Meta =require('./models/Meta.js');
var citibike =require('./models/Bikes.js');
var Subways =require('./models/Subways.js');
/*var Transfers =require('./models/Transfers.js');
var Tranwithlines =require('./models/Tranwithlines.js');*/
var busgeo =require('./models/Busses.js');




var mta = new Mta({
    key: 'd95f1fb11f498729369198ba2d321657', // only needed for mta.schedule() method                 
});
/*    app.get("/api/bikes", function(req, res) {
.find({}).then(function(resp) {
    console.log(resp)
    res.json(resp)
})
    });*/
app.get("/api/stops/:coordinates?", function(req, res) {
    if(req.query.lat) {
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
                num:25
            }
        }],
        function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        })
   }
});
app.get("/api/stations/:coordinates?", function(req, res) {
    if(req.query.lat) {
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
                maxDistance: 804.34,
                spherical: true,
                distanceField: 'distance.dist',
                distanceMultiplier: 0.00062,
                num:50
            }
        }],
        function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        })
   }
});
app.get("/api/bus/:coordinates?", function(req, res) {
    if(req.query.lat) {
        console.log(req.query.lng)
        console.log(req.query.lat)
        var lat = parseFloat(req.query.lat)
        var lng = parseFloat(req.query.lng) 
    busgeo.aggregate([{
            $geoNear: {
                near: { 
                    type: 'Point',                  
                    coordinates: [lng, lat]       
                },
                maxDistance: 804.34,
                spherical: true,
                distanceField: 'distance.dist',
                distanceMultiplier: 0.00062,
                num:25
            }
        }],
        function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        })
   }
});
app.post("/api/meta/:metrics?", function(req, res) {

  console.log(req.body)
  var newMeta = new Meta(req.body);

  newMeta.save(function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
        res.send(doc)
    }
  });
});
app.get("/api/meta", function(req, res) {
 Meta.find({}, function(error, doc) {
        if (error) {
      console.log(error);
    }
    else {
        res.send(doc)
    }
 })
});

app.get('/api/xfer', function(req, res) {
    console.log(req.query.route)
    var ln = req.query.route
  Tranwithlines.find({line: req.query.route , $where: "this.from_stop_id != this.to_stop_id"}, function(error, doc) {
   
    if (error) {
      console.log(error);
    }

    else {
        console.log(doc)
      res.json(doc);
    }
  })


/*    var rte = new RegExp(".*^" + req.query.route + ".*") 
    console.log(rte)
  Transfers.find({from_stop_id: rte, $where: "this.from_stop_id != this.to_stop_id"}, function(error, doc) {
   
    if (error) {
      console.log(error);
    }

    else {
        console.log(doc)
      res.json(doc);
    }
  });*/
})


app.get('/api/status', function(req, res) {
    mta.status().then(function(doc) {
        console.log(doc);
        res.json(doc)
    });
})
// ------- route for selected train's schedule --------
app.get("/api/train?", function(req, res) {
    console.log(req.query)
        var feed = parseInt(req.query.feed);
        var id = req.query.id;
  
mta.schedule(id, parseInt(req.query.feed)).then(function (result) {
  console.log(result);
  res.json(result)
        })
        feed= "";
        id = 0;
});
    app.get("/api/bikes", function(req, res) {
        console.log(req.query)
        var lat = parseFloat(req.query.lat)
        var lng = parseFloat(req.query.lng) 

    citibike.aggregate([{
            $geoNear: {
                near: { 
                    type: 'Point',                  
                    coordinates: [lng, lat]       
                },
                maxDistance: 804.34,
                spherical: true,
                distanceField: 'distance.dist',
                distanceMultiplier: 0.00062,
                num:50
            }
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


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Next Train listening on ${port}`);


 


