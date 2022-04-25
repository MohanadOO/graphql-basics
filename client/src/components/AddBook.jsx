import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { useForm } from 'react-hook-form'
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries'

function AddBook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data, addBook) => {
    addBook({
      variables: {
        name: data.bookName,
        genre: data.genre,
        authorid: data.authorid,
      },
      refetchQueries: [{ query: getBooksQuery }],
    })
  }

  const options = () => {
    return (
      <Query query={getAuthorsQuery}>
        {({ loading, error, data }) => {
          if (loading) return <option>Loading Authors... ⌛</option>
          if (error) return <option>Error 😢</option>

          return data.authors.map(({ name, id }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            )
          })
        }}
      </Query>
    )
  }

  return (
    <Mutation mutation={addBookMutation}>
      {(addBook, { data }) => (
        <form onSubmit={handleSubmit((data) => onSubmit(data, addBook))}>
          <input
            placeholder='Book Name 📕'
            {...register('bookName', { required: true })}
          />
          <input
            placeholder='Genre 🌀'
            {...register('genre', { required: true })}
          />
          <select {...register('authorid')}>
            {' '}
            <option>Select the Author ✒</option>
            {options()}
          </select>
          <input type='submit' value='Add Book 📕' />
        </form>
      )}
    </Mutation>
  )
}

export default AddBook
