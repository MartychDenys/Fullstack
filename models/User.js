const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // Говорит что имейл будет уникальным и не может повторяться
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('users', userSchema);