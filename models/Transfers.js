var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TransferSchema = new Schema({
from_stop_id: Number,
to_stop_id: Number,
transfer_type: Number,
min_transfer_time: Number   

});

var Transfer = mongoose.model("Transfer", TransferSchema);

module.exports = Transfer;