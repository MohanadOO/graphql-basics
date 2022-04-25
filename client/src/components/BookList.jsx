import React from 'react'
import { Query } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'

function BookList() {
  return (
    <Query query={getBooksQuery}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error 😢</p>

        return (
          <ul className='book-list'>
            {data.books.map(({ name, id }) => {
              return <li key={id}>{name}</li>
            })}
          </ul>
        )
      }}
    </Query>
  )
}

export default BookList
