import { gql } from 'graphql-tag'

export const schema = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product!
  }

  input CreateProductInput {
    name: String!
    description: String!
  }

  input UpdateProductInput {
    name: String
    description: String
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
  }
`
