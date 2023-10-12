import { ProductsDatastoreRepository } from '@/shop/infrastructure/repositories/products-datastore-repository'
import { ShopEcommerceApplication } from '@/shop/application'

const productsDatastoreRepository = new ProductsDatastoreRepository()

export const devShopEcommerceApplication = new ShopEcommerceApplication({
  productsRepository: productsDatastoreRepository,
})
