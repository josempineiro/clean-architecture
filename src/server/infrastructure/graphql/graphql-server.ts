import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import typeDefs from "@/ecommerce/infrastructure/graphql/schema"
import resolvers from "@/server/infrastructure/graphql/resolvers"
import { ProductsMockRepository } from "@/server/infrastructure/repositories/products-mock-repository"
import { ServerEcommerceApplication} from "@/server/application"

const productsMockRepository = new ProductsMockRepository()

const serverApplication = new ServerEcommerceApplication({
  productsRepository: productsMockRepository
})

const apolloServer = new ApolloServer<ServerEcommerceApplication>({
  typeDefs,
  resolvers,
  // @ts-ignore
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})

const handleRequest = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, ...serverApplication }),
})

export { handleRequest as GET, handleRequest as POST }

