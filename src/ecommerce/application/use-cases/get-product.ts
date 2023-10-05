import { UseCase } from '@/core/domain'
import { Product } from '@/ecommerce/domain'

export type GetProductVariables = {
  id: string
}

export type GetProductResult = Product


export abstract class GetProductUseCase<GetProductDependencies = any> implements UseCase<GetProductVariables, GetProductResult> {
  public dependencies: GetProductDependencies
  constructor(dependencies: GetProductDependencies
  ) {
    this.dependencies = dependencies
  }
  abstract execute(variables: GetProductVariables): Promise<GetProductResult>
}