import { useState } from 'react'
import BookList from './components/BookList'
import AddBook from './components/AddBook'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { PlusCircleIcon } from '@heroicons/react/solid'

const client = new ApolloClient({
  uri: 'http://localhost:5500/graphql',
})

function App() {
  const [addBook, setAddBook] = useState(false)
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h1>Reading List</h1>
        <BookList />
        {!addBook ? (
          <PlusCircleIcon
            className='plus-icon'
            onClick={() => setAddBook(true)}
          />
        ) : null}
        {addBook ? <AddBook /> : null}
      </div>
    </ApolloProvider>
  )
}

export default App
