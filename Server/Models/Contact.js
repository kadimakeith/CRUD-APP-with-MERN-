const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: true,
    },
    Country : {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    }
});

const Contact = mongoose.model('food' , ContactSchema);
module.exports = Food