import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { EcommerceGraphQLServer, serverApplication } from '@/server/infrastructure/graphql/server'

const ecommerceGraphQLServer = new EcommerceGraphQLServer()

const handleRequest = startServerAndCreateNextHandler(ecommerceGraphQLServer, {
  context: async (req: any, res :any) => {
    return({ req, res, application: serverApplication })
  }
})

export { handleRequest as GET, handleRequest as POST }
