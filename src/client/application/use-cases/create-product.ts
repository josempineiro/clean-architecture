import { CreateProductUseCase } from '@/ecommerce/application'
import type { CreateProductVariables, CreateProductResult } from '@/ecommerce/application'
import { ProductsRepository, Products } from '@/ecommerce/domain'

export type CreateProductClientUseCaseDependencies = {
  productsRepository:ProductsRepository
}

export class CreateProductClientUseCase extends CreateProductUseCase<CreateProductClientUseCaseDependencies> {

  async execute(product: CreateProductVariables): Promise<CreateProductResult> {
    return await this.dependencies.productsRepository.create(Products.create(product))
  }
}