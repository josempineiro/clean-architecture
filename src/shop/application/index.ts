import { EcommerceApplication, EcommerceUseCases } from '@/ecommerce/application'
import { GetProductsShopUseCase } from '@/shop/application/use-cases/get-products'
import { GetProductShopUseCase } from '@/shop/application/use-cases/get-product'
import { ProductsRepository } from '@/ecommerce/domain'

export type ShopApplicationDependencies = {
  productsRepository: ProductsRepository
}


export interface ShopApplicationUseCases extends EcommerceUseCases {
  getProducts: GetProductsShopUseCase
  getProduct: GetProductShopUseCase
}

export class ShopApplication extends EcommerceApplication<ShopApplicationUseCases> {
  constructor(readonly dependencies: ShopApplicationDependencies) {
    super({
      getProducts: new GetProductsShopUseCase(dependencies),
      getProduct: new GetProductShopUseCase(dependencies),
    })
  }
}
