import { ProductsGraphqlRepository } from '@/client/infrastructure/repositories/products-graphql-repository'
import { ClientEcommerceApplication } from '@/client/application'

const productsDatastoreRepository = new ProductsGraphqlRepository('/graphql')

export const productiveClientEcommerceApplication =
  new ClientEcommerceApplication({
    productsRepository: productsDatastoreRepository,
  })

export default productiveClientEcommerceApplication
