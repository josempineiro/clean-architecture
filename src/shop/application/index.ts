import { EcommerceApplication } from '@/ecommerce/application'
import { CreateProductShopUseCase } from '@/shop/application/use-cases/create-product'
import { GetProductsShopUseCase } from '@/shop/application/use-cases/get-products'
import { GetProductShopUseCase } from '@/shop/application/use-cases/get-product'
import { ProductsRepository } from '@/ecommerce/domain'

export * from '@/shop/application/use-cases/create-product'
export * from '@/shop/application/use-cases/get-products'

export type ShopEcommerceApplicationDependencies = {
  productsRepository: ProductsRepository
}
export class ShopEcommerceApplication extends EcommerceApplication {
  constructor(readonly dependencies: ShopEcommerceApplicationDependencies) {
    super({
      getProducts: new GetProductsShopUseCase(dependencies),
      createProduct: new CreateProductShopUseCase(dependencies),
      getProduct: new GetProductShopUseCase(dependencies),
    })
  }
}
