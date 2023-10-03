import { ProductsRepository } from '@/ecommerce/domain'
import type { CreateProductUseCase, CreateProductVariables, CreateProductResult } from '@/ecommerce/application'

export type CreateProductServerUseCaseDependencies = {
  productsRepository: ProductsRepository
}

export class CreateProductServerUseCase implements CreateProductUseCase {
  constructor(
    private readonly dependencies: CreateProductServerUseCaseDependencies
  ) {}

  async execute(product: CreateProductVariables): Promise<CreateProductResult> {
    return await this.dependencies.productsRepository.create(product)
  }
}