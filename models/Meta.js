var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var metaSchema = new Schema({
	metrics: {
	properties: {
		 address: String,
		 place_id: String,
		 bikeLength: Number, 
		 subwayLength: Number,
		 ASPLength: Number,
		 busLength: Number,
		 metersLength: Number,
		 bikeDist: Number,
		 subwayDist: Number
	},
	geometry: {
	    coordinates: {type: [Number], index: '2dsphere'},
	    type: {default: "Point"}
	 }
	 }
});

var Meta = mongoose.model("meta", metaSchema);

module.exports = Meta;