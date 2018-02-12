var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var ConsolidatedSchema = new Schema({

  properties: {
      stop_name: {type: String, required: true },
      stop_id: {type: String, required: true },
      stop_feed: {type: Number, required: true}
  },
  geometry: {
      coordinates: {type: [Number], index: '2dsphere'},
      type: {default: "Point"
        }
     },
  transfers: {
      from_stop_id: {type: String, required: true },
      to_stop_id: {type: String, required: true },
      transfer_type: {type: Number, required: true},
      min_transfer_time: {type: Number, required: true}
      }
});

var Consolidated = mongoose.model("Consolidated", ConsolidatedSchema);

module.exports = Consolidated;