const mongoose = require('mongoose');
const user = new mongoose.Schema({
    username: String,
    id: {
        type: String,
        required: true
    },
    avatar: String,
    discriminator: String,
    guilds: Array,
    api: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Users', user);