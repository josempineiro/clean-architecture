import { UseCase } from '@/core/domain'
import { Product } from '@/ecommerce/domain'

export type ProductCreationVariables = {
  name: string
  description: string
}

export type ProductCreationResult = Product

export abstract class CreateProductUseCase<CreateProductDependencies = any> implements UseCase<ProductCreationVariables, ProductCreationResult> {
  public dependencies: CreateProductDependencies
  constructor(dependencies: CreateProductDependencies
  ) {
    this.dependencies = dependencies
  }
  abstract execute(product: ProductCreationVariables): Promise<ProductCreationResult>
}