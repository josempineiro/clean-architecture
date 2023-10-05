import { ProductsDatastoreRepository } from '@/client/infrastructure/repositories/products-datastore-repository'
import { ClientEcommerceApplication } from '@/client/application';

const productsDatastoreRepository = new ProductsDatastoreRepository()

export const devClientEcommerceApplication = new ClientEcommerceApplication({
  productsRepository: productsDatastoreRepository
})

export default devClientEcommerceApplication