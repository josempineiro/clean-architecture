import { ProductsMockRepository } from '@/shop/infrastructure/repositories/products-mock-repository'
import { ClientEcommerceApplication } from '@/shop/application'

const productsMockRepository = new ProductsMockRepository()

export const testClientEcommerceApplication = new ClientEcommerceApplication({
  productsRepository: productsMockRepository,
})

export default testClientEcommerceApplication
