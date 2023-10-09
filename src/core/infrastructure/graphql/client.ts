import { GraphQLClient as GraphQLRequestClient } from 'graphql-request'

export class GraphQLClient extends GraphQLRequestClient {
  constructor(uri: string) {
    super(uri)
  }
}
