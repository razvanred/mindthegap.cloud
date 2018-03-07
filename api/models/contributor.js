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
    email: { type: String, required: true, unique: true, trim: true },
    username: {
        type: String,
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model('Contributor', ContributorSchema);