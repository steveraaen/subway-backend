var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var busgeoSchema = new Schema({

   properties: {
     stop_id: Number,
     stop_desc: String,
     stop_name: String
},
     geometry: {
      coordinates: {type: [Number], index: '2dsphere'},
      type: String
     },
});

var busgeo = mongoose.model("Busgeo", busgeoSchema);

module.exports = busgeo;