import { Application } from '@/core/domain'
import { CreateProductUseCase } from '@/ecommerce/application/use-cases/create-product'
import { GetProductsUseCase } from '@/ecommerce/application/use-cases/get-products'
import { GetProductUseCase } from '@/ecommerce/application/use-cases/get-product'

export * from '@/ecommerce/application/use-cases/create-product'
export * from '@/ecommerce/application/use-cases/get-products'
export * from '@/ecommerce/application/use-cases/get-product'


export type EcommerceUseCase = CreateProductUseCase | GetProductsUseCase | GetProductUseCase 

export type EcommerceUseCases = Record<string, EcommerceUseCase>

export abstract class EcommerceApplication<TEcommerceUseCases extends EcommerceUseCases>
  implements Application<TEcommerceUseCases>
{
  public useCases: TEcommerceUseCases
  constructor(useCases: TEcommerceUseCases) {
    this.useCases = useCases
  }
}
