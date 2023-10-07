import { ProductsMockRepository } from '@/client/infrastructure/repositories/products-mock-repository'
import { ClientEcommerceApplication } from '@/client/application';

const productsMockRepository = new ProductsMockRepository()

export const testClientEcommerceApplication = new ClientEcommerceApplication({
  productsRepository: productsMockRepository
})

export default testClientEcommerceApplication