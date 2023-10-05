import { gql } from 'graphql-tag'

export default gql`
  type Product {
    id: ID!
    name: String!
    description: String!
  }

  type Query {
    products: [Product!]!
  }

  input UpdateProductInput {
    name: String!
    description: String!
  }

  input CreateProductInput {
    name: String!
    description: String!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
  }
`