const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('../schema/schema')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
  console.log('Connected to database')
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

app.listen(5500, () => {
  console.log('now listening for requests on port 5500')
})
