import { EcommerceApplication } from '@/ecommerce/application'
import { CreateProductServerUseCase } from '@/server/application/use-cases/create-product'
import { GetProductsServerUseCase } from '@/server/application/use-cases/get-products'
import { GetProductServerUseCase } from '@/server/application/use-cases/get-product'
import { ProductsRepository } from '@/ecommerce/domain'

export * from '@/server/application/use-cases/create-product'
export * from '@/server/application/use-cases/get-products'
export * from '@/server/application/use-cases/get-product'

export type ServerEcommerceApplicationDependencies = {
  productsRepository: ProductsRepository
}

export type ServerEcommerceApplicationUseCases = {
  getProducts: GetProductsServerUseCase,
  createProduct: CreateProductServerUseCase,
  getProduct: GetProductServerUseCase
}
export class ServerEcommerceApplication extends EcommerceApplication {
  constructor(readonly dependencies: ServerEcommerceApplicationDependencies) {
    super({
      getProducts: new GetProductsServerUseCase(dependencies),
      createProduct: new CreateProductServerUseCase(dependencies),
      getProduct: new GetProductServerUseCase(dependencies)
    })
  }
}
