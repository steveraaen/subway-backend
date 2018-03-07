var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var citibikeSchema = new Schema({
 /*   type:  {type: String},*/
    properties: {
        id:  {type: Number},
        stationName:  {type: String},
        availableDocks: {type: Number},
        statusValue: {type: String},
        statusKey: {type: Number},
        availableBikes: {type: Number},
        stAddress1: {type: String},
        lastCommunicationTime: {type: String},
    },
  geometry: {
      coordinates: {type: [Number], index: '2dsphere'},
      
     }
});

var citibike = mongoose.model("citibike", citibikeSchema);

module.exports = citibike;



