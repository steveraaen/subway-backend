var mongoose = require('mongoose');
var Subways = require('./Subways.js');

var Schema = mongoose.Schema;

var TransferSchema = new Schema({

_id: Schema.Types.ObjectId,
from_stop_id: String,
to_stop_id: String,
transfer_type: Number,
min_transfer_time: Number,
stops: [{ type: Schema.Types.ObjectId, ref: 'Subways' }]

});

var Transfer = mongoose.model("Transfer", TransferSchema);

module.exports = Transfer;