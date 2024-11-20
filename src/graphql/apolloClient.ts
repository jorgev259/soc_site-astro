import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

const httpLink = createUploadLink({
  uri: `${window.origin}/api/graphql`,
  headers: { 'Apollo-Require-Preflight': true },
  credentials: 'include'
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  credentials: 'same-origin'
})

export default apolloClient
