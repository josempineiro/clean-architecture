import { UseCase } from '@/core/domain'
import { Product } from '@/ecommerce/domain'

export type CreateProductVariables = {
  name: string
  description: string
}

export type CreateProductResult = Product

export abstract class CreateProductUseCase<CreateProductDependencies = any> implements UseCase<CreateProductVariables, CreateProductResult> {
  public dependencies: CreateProductDependencies
  constructor(dependencies: CreateProductDependencies
  ) {
    this.dependencies = dependencies
  }
  abstract execute(product: CreateProductVariables): Promise<CreateProductResult>
}