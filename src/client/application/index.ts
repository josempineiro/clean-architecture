import { UseCase } from '@/core/domain'
import { EcommerceApplication } from '@/ecommerce/application'

import { CreateProductUseCase } from '@/ecommerce/application/use-cases/create-product';
import { GetProductsUseCase } from '@/ecommerce/application/use-cases/get-products'

export * from '@/ecommerce/application/use-cases/create-product'
export * from '@/ecommerce/application/use-cases/get-products'

interface EcommerceUseCases extends Record<string, UseCase<any>> {
  getProducts: GetProductsUseCase,
  createProduct: CreateProductUseCase,
}

export class ClientEcommerceApplication extends EcommerceApplication {

}
