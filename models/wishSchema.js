const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true
    },
    message: {
        type: String, 
        required: true
    }
});

const Wish = mongoose.model('wishes', wishSchema);

module.exports = Wish;