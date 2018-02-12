var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var StopstransfersSchema = new Schema({

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
    from_stop_id: {type: String},
    to_stop_id: {type: String},
    transfer_type: {type: Number},
    min_transfer_time: {type: Number}
});

var Stopstransfers = mongoose.model("Stopstransfers", StopstransfersSchema);

module.exports = Stopstransfers;