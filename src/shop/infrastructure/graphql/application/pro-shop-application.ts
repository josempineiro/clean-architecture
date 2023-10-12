import { ProductsGraphqlRepository } from '@/shop/infrastructure/repositories/products-graphql-repository'
import { ShopEcommerceApplication } from '@/shop/application'

const productsDatastoreRepository = new ProductsGraphqlRepository('/graphql')

export const productiveShopEcommerceApplication =
  new ShopEcommerceApplication({
    productsRepository: productsDatastoreRepository,
  })
