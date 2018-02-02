var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
    content: String,
    timestamp: Date,
    visited: Number,
    id:Number
});

var listModel = mongoose.model('listModel', ListSchema);

module.exports = listModel;