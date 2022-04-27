import React from 'react'
import { Query } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

function BookDetails(props) {
  return (
    <Query query={getBookQuery} variables={{ id: props.bookID }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error 😢</p>
        if (props.bookID === null) return <p>No Book is selected!</p>

        return (
          <div className='book-details'>
            <h2 className='book-name'>{data.book.name} 📕</h2>
            <h3 className='book-genre'>
              <span>Genre:</span> {data.book.genre}
            </h3>
            <h3 className='book-author-name'>
              <span>Author:</span> {data.book.author.name}
            </h3>
            <h3 className='book-author-age'>
              <span>Author Age:</span> {data.book.author.age}
            </h3>
            <ul className='author-books'>
              {data.book.author.books.map(({ name, id }) => {
                return <li key={id}>{name}</li>
              })}
            </ul>
          </div>
        )
      }}
    </Query>
  )
}

export default BookDetails
