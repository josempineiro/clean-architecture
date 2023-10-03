import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

import typeDefs from "@/server/infrastructure/graphql/schema"
import resolvers from "@/server/infrastructure/graphql/resolvers"

import { GetProductsUseCase, CreateProductUseCase } from "@/ecommerce/application"

const apolloServer = new ApolloServer<{
  useCases: {
    getProducts: GetProductsUseCase,
    createProducs: CreateProductUseCase
  }
}>({
  typeDefs,
  resolvers,
  // @ts-ignore
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})
let value = 0
console.log('value', value)

const handleRequest = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, useCases: { getProducts: {
    execute: () => {
      value++
    console.log(value)
    return[]
  }} } }),
})

export { handleRequest as GET, handleRequest as POST }

