const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

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

const root = path.join(__dirname, 'dist')
app.use(express.static(root))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(process.env.PORT || 5500, () => {
  console.log('now listening for requests on port 5500')
})
