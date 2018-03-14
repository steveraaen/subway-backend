var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var metaSchema = new Schema({

 bikeLength: Number, 
 subwayLength: Number,
 ASPLength: Number,
 busLength: Number,
 metersLength: Number,
 lng: Number,
 lat: Number,
 bikeDist: Number,
 subwayDist: Number

});

var Meta = mongoose.model("meta", metaSchema);

module.exports = Meta;