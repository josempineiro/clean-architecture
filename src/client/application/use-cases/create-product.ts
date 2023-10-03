import { ProductsRepository } from '@/ecommerce/domain'
import type { CreateProductUseCase, CreateProductVariables, CreateProductResult } from '@/ecommerce/application'

export type CreateProductClientUseCaseDependencies = {
  productsRepository:ProductsRepository
}

export class CreateProductClientUseCase implements CreateProductUseCase {
  constructor(
    private readonly dependencies: CreateProductClientUseCaseDependencies
  ) {}

  async execute(product: CreateProductVariables): Promise<CreateProductResult> {
    return await this.dependencies.productsRepository.create(product)
  }
}