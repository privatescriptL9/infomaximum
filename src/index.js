import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client'


const token = localStorage.getItem('token')

let link = from([
  new HttpLink({
    uri: 'http://localhost:4000/api',
    headers: {
      Authorization: `Bearer ${token}`
    },
  }),
])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
