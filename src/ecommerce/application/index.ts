import { UseCase, Application } from '@/core/domain'
import { CreateProductUseCase } from '@/ecommerce/application/use-cases/create-product';
import { GetProductsUseCase } from '@/ecommerce/application/use-cases/get-products'

export * from '@/ecommerce/application/use-cases/create-product'
export * from '@/ecommerce/application/use-cases/get-products'
interface EcommerceUseCases extends Record<string, UseCase<any>> {
  getProducts: GetProductsUseCase,
  createProduct: CreateProductUseCase,
}

export abstract class EcommerceApplication implements Application<EcommerceUseCases> {
  public useCases: EcommerceUseCases
  constructor(
    useCases: EcommerceUseCases
  ) {
    this.useCases = useCases
  }
}
