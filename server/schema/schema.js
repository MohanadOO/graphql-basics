const graphql = require('graphql')
var _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql

//dummy data
var books = [
  { name: 'First Book 1', genre: 'Sport', id: '1' },
  { name: 'First Book 2', genre: 'Sci-Fi', id: '2' },
  { name: 'First Book 3', genre: 'History', id: '3' },
]

//Specifying what the book object type and what are the info about each book is.
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //Code to get data from db or other source
        console.log(typeof args.id)
        return _.find(books, { id: args.id })
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
