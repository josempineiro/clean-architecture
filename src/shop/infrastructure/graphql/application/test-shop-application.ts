import { ProductsMockRepository } from '@/shop/infrastructure/repositories/products-mock-repository'
import { ShopEcommerceApplication } from '@/shop/application'

const productsMockRepository = new ProductsMockRepository()

export const testShopEcommerceApplication = new ShopEcommerceApplication({
  productsRepository: productsMockRepository,
})

