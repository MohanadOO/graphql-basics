const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('../schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

//Allow cross-origin request
app.use(cors())

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_URI_USERNAME}:${process.env.MONGO_URI_PASSWORD}@cluster0.qip2f.mongodb.net/graphqlbasics?retryWrites=true&w=majority`
)
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

const root = require('path').join(__dirname, '../client/dist')
app.use(express.static(root))

app.listen(process.env.port || 5500, () => {
  console.log('now listening for requests on port 5500')
})
