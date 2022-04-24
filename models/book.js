const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: String,
    genre: String, 
    authorid: String
})

models.exports = mongoose.model('Book', bookSchema)
