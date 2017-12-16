var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StopsSchema = new Schema({
  
  geometry: {
	   	coordinates: {type: [Number]},
	   	type: {type: String}
	   }, 
  properties: {
      stop_name: {type: String},
      stop_id: {type: String},
      stop_feed: {type: Number}
  }
});

var Stops = mongoose.model("Stops", StopsSchema);

module.exports = Stops;