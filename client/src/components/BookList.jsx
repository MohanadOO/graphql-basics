import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

function BookList() {
  const [selected, setSelected] = useState(null)
  return (
    <>
      <Query query={getBooksQuery}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error 😢</p>

          return (
            <ul className='book-list'>
              {data.books.map(({ name, id }) => {
                return (
                  <li onClick={() => setSelected(id)} key={id}>
                    {name}
                  </li>
                )
              })}
            </ul>
          )
        }}
      </Query>
      <BookDetails bookID={selected} />
    </>
  )
}

export default BookList
