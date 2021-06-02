const mongoose = require('mongoose');
const validator = require('validator');

var peopleSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email id 😞");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min: 10,
    },
    city: {
        type: String,
        required: true,
    }
});




mongoose.model('People', peopleSchema);