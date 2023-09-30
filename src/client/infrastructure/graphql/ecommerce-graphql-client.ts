import { GraphQLClient } from 'graphql-request'

const client = ({
  uri = 'http://localhost:3000/graphql',
}: {
  uri?: string,
}) => new GraphQLClient(uri)

export default client