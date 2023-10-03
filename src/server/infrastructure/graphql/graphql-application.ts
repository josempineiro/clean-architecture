import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { ServerApplicationUseCases } from "@/server/application"
import typeDefs from "@/server/infrastructure/graphql/schema"
import resolvers from "@/server/infrastructure/graphql/resolvers"
import { ProductsMockRepository } from "@/server/infrastructure/repositories/products-mock-repository"
import {
  CreateProductServerUseCase,
  GetProductsServerUseCase,
} from "@/server/application"

const productsMockRepository = new ProductsMockRepository()

const useCases: ServerApplicationUseCases = {
  getProducts: new GetProductsServerUseCase({ productsRepository:productsMockRepository }),
  createProduct: new CreateProductServerUseCase({ productsRepository: productsMockRepository }),
}

const apolloServer = new ApolloServer<{
  useCases: ServerApplicationUseCases
}>({
  typeDefs,
  resolvers,
  // @ts-ignore
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})

const handleRequest = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, useCases }),
})

// export { handleRequest as GET, handleRequest as POST }

