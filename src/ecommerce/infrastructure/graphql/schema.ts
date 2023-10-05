import { gql } from 'graphql-tag'

export default gql`
  type Price {
    value: Float!
    currency: String!
  }

  type Category {
    id: ID!
    name: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Price!
    categories: [Category!]!
  }

  type Query {
    products: [Product!]!
    categories: [Category!]!
  }

  input UpdateProductInput {
    name: String!
    description: String!
  }
  input CreateProductInput {
    name: String!
    description: String!
    price: Float!
    currency: String!
    categories: [ID!]!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
  }
`