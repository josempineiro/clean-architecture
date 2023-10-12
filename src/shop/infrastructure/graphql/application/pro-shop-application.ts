import { ProductsGraphqlRepository } from '@/shop/infrastructure/repositories/products-graphql-repository'
import { ClientEcommerceApplication } from '@/shop/application'

const productsDatastoreRepository = new ProductsGraphqlRepository('/graphql')

export const productiveClientEcommerceApplication =
  new ClientEcommerceApplication({
    productsRepository: productsDatastoreRepository,
  })
