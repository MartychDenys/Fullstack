const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Можем создавать определенную схему для модели

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    user: {
        ref: 'users',    // Делаем ссылку на данную колекцию
        type: Schema.Types.ObjectId // Таким образом указываем на тип _id который создаеться автоматически
    }
}); // Описываем нужную схему


module.exports = mongoose.model('categories', categorySchema);