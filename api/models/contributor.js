const mongoose = require('mongoose');

const ContributorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    details: {
        name: {
            type: String,
            trim: true
        },
        surname: {
            type: String,
            trim: true
        },
        birthDate: Date
    },
    joinDate: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

module.exports = mongoose.model('Contributor', ContributorSchema);