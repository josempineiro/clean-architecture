import { EcommerceApplication } from '@/ecommerce/application'
import { CreateProductClientUseCase } from '@/shop/application/use-cases/create-product'
import { GetProductsClientUseCase } from '@/shop/application/use-cases/get-products'
import { GetProductClientUseCase } from '@/shop/application/use-cases/get-product'
import { ProductsRepository } from '@/ecommerce/domain'

export * from '@/shop/application/use-cases/create-product'
export * from '@/shop/application/use-cases/get-products'

export type ClientEcommerceApplicationDependencies = {
  productsRepository: ProductsRepository
}
export class ClientEcommerceApplication extends EcommerceApplication {
  constructor(readonly dependencies: ClientEcommerceApplicationDependencies) {
    super({
      getProducts: new GetProductsClientUseCase(dependencies),
      createProduct: new CreateProductClientUseCase(dependencies),
      getProduct: new GetProductClientUseCase(dependencies),
    })
  }
}
