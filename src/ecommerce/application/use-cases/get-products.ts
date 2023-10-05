import { UseCase } from '@/core/domain'
import { Product } from '@/ecommerce/domain'

export type GetProductsVariables = void

export type GetProductsResult = Array<Product>


export abstract class GetProductsUseCase<GetProductsDependencies = any> implements UseCase<GetProductsVariables, GetProductsResult> {
  public dependencies: GetProductsDependencies
  constructor(dependencies: GetProductsDependencies
  ) {
    this.dependencies = dependencies
  }
  abstract execute(): Promise<GetProductsResult>
}