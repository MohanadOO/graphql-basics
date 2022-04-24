const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
  name: String,
  age: Number,
})

models.exports = mongoose.model('Author', authorSchema)
