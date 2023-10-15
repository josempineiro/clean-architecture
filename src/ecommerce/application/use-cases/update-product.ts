import { UseCase } from '@/core/domain'
import { Product } from '@/ecommerce/domain'

export type UpdateProductVariables = {
  id: string
  name?: string
  description?: string
}

export type UpdateProductResult = Product

export abstract class UpdateProductUseCase<UpdateProductDependencies = any>
  implements UseCase<UpdateProductVariables, UpdateProductResult>
{
  public dependencies: UpdateProductDependencies
  constructor(dependencies: UpdateProductDependencies) {
    this.dependencies = dependencies
  }
  abstract execute(
    product: UpdateProductVariables,
  ): Promise<UpdateProductResult>
}
