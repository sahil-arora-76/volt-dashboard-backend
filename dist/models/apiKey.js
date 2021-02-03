const mongoose = require('mongoose');

const apiKey = new mongoose.Schema({
    userId: String
});

module.exports = mongoose.model('apiKey', apiKey );