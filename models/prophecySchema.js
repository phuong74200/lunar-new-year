const mongoose = require('mongoose');

const prophecySchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true
    },
    love: {
        type: String, 
        required: true
    },
    career: {
        type: String,
        required: true
    },
    money: {
        type: String,
        required: String
    }
});

const Prophecy = mongoose.model('prophecies', prophecySchema);

module.exports = Prophecy;