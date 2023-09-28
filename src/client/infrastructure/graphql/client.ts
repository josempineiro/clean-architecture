import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = ({
  uri = 'http://localhost:3000/graphql',
}: {
  uri?: string,
}) => new ApolloClient({
  uri,
  cache: new InMemoryCache()
})

export default client