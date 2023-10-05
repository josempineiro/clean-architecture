import { ProductsGraphqlRepository } from '@/client/infrastructure/repositories/products-graphql-repository'
import { ClientEcommerceApplication } from '@/client/application';

const productsDatastoreRepository = new ProductsGraphqlRepository()

export const productiveClientEcommerceApplication = new ClientEcommerceApplication({
  productsRepository: productsDatastoreRepository
})

export default productiveClientEcommerceApplication