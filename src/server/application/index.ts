import { EcommerceApplication } from '@/ecommerce/application'
import { GetProductServerUseCase } from '@/server/application/use-cases/get-product'
import { GetProductsServerUseCase } from '@/server/application/use-cases/get-products'
import { CreateProductServerUseCase } from '@/server/application/use-cases/create-product'
import { UpdateProductServerUseCase } from '@/server/application/use-cases/update-product'

import { ProductsRepository } from '@/ecommerce/domain'

export * from '@/server/application/use-cases/get-product'
export * from '@/server/application/use-cases/get-products'
export * from '@/server/application/use-cases/create-product'
export * from '@/server/application/use-cases/update-product'


export type ServerEcommerceApplicationDependencies = {
  productsRepository: ProductsRepository
}

export type ServerEcommerceApplicationUseCases = {
  getProduct: GetProductServerUseCase
  getProducts: GetProductsServerUseCase
  createProduct: CreateProductServerUseCase
  updateProduct: UpdateProductServerUseCase
}
export class ServerEcommerceApplication extends EcommerceApplication<ServerEcommerceApplicationUseCases> {
  constructor(readonly dependencies: ServerEcommerceApplicationDependencies) {
    super({
      getProduct: new GetProductServerUseCase(dependencies),
      getProducts: new GetProductsServerUseCase(dependencies),
      createProduct: new CreateProductServerUseCase(dependencies),
      updateProduct: new UpdateProductServerUseCase(dependencies),

    })
  }
}
