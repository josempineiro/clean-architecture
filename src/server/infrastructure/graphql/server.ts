import { Products } from '@/ecommerce/domain'
import { GraphQLServer } from "@/core/infrastructure"
import { typeDefs } from "@/ecommerce/infrastructure"
import { ServerEcommerceApplication} from "@/server/application"
import resolvers from "@/server/infrastructure/graphql/resolvers"
import { ProductsMockRepository } from "@/server/infrastructure/repositories/products-mock-repository"

const productsMockRepository = new ProductsMockRepository([
  Products.create({
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
  })
])

export const serverApplication = new ServerEcommerceApplication({
  productsRepository: productsMockRepository
})

export class EcommerceGraphQLServer extends GraphQLServer<ServerEcommerceApplication> {
  constructor() {
    super({
      typeDefs,
      resolvers,
      application: serverApplication,
    })
  }
}
