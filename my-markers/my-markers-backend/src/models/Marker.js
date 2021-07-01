const mongoose = require('mongoose');

const MarkerSchema = new mongoose.Schema({
    title: String,
    username: String,
    note: String,
    lat: Number,
    lng: Number,
    category: String,
    addr: String,
    created: {
        type: Date,
        default: Date.now
    }
});

global.Marker = global.Marker || mongoose.model('Marker', MarkerSchema);
module.exports = global.Marker;