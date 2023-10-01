import { ProductsRepository } from '@/ecommerce/domain'
import type { CreateProductUseCase, CreateProductParams, CreateProductResult } from '@/ecommerce/application'

export type CreateProductClientUseCaseDependencies = {
  productsRepository:ProductsRepository
}

export class CreateProductClientUseCase implements CreateProductUseCase {
  constructor(
    private readonly dependencies: CreateProductClientUseCaseDependencies
  ) {}

  async execute(product: CreateProductParams): Promise<CreateProductResult> {
    return await this.dependencies.productsRepository.create(product)
  }
}