import { ProductsDatastoreRepository } from '@/shop/infrastructure/repositories/products-datastore-repository'
import { ClientEcommerceApplication } from '@/shop/application'

const productsDatastoreRepository = new ProductsDatastoreRepository()

export const devClientEcommerceApplication = new ClientEcommerceApplication({
  productsRepository: productsDatastoreRepository,
})
