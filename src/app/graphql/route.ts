import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

import typeDefs from "@/server/infrastructure/graphql/schema"
import resolvers from "@/server/infrastructure/graphql/resolvers"

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})

const handleRequest = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res }),
})

export { handleRequest as GET, handleRequest as POST }

