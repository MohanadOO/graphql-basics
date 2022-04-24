const graphql = require('graphql')
var _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql

// //dummy data
// var books = [
//   { name: 'The Name of the Wind', genre: 'Fantasy', id: '1', authorid: '1' },
//   { name: `The Wise Man's fear`, genre: 'Fantasy', id: '2', authorid: '1' },
//   { name: 'Skyward', genre: 'Sci-fi', id: '3', authorid: '2' },
//   { name: 'Night Watch', genre: 'Fantasy', id: '4', authorid: '3' },
// ]

// //dummy author data
// var authors = [
//   { name: 'Patrick Rothfuss', age: 44, id: '1' },
//   { name: 'Brandon Sanderson', age: 42, id: '2' },
//   { name: 'Terry Pratchett', age: 66, id: '3' },
// ]

//Specifying what the book object type and what are the info about each book is.
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorid })
      },
    },
  }),
})

//Specifying what the author object type and what are the info about each author is.
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorid: parent.id })
      },
    },
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
        // return _.find(books, { id: args.id })
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id })
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
