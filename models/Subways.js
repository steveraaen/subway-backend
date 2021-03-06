var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var StopsSchema = new Schema({

  properties: {
      stop_name: {type: String},
      stop_id: {type: String},
      stop_feed: {type: Number}
  },
  geometry: {
      coordinates: {type: [Number], index: '2dsphere'},
      type: {default: "Point"
        }
     },
  from_stop_id: [{ type: Schema.ObjectId, ref: 'Transfer' }]
});

var Stops = mongoose.model("Stops", StopsSchema);

module.exports = Stops;