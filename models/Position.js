const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        ref: 'categories', // Референция
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users', //Смотрим колекцию users
        type: Schema.Types.ObjectId
    }
}); // Обьект конфигурации

module.exports = mongoose.model('positions', positionSchema);