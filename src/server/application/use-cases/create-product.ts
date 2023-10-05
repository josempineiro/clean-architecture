import { ProductsRepository, Products } from '@/ecommerce/domain'
import { CreateProductUseCase } from '@/ecommerce/application'
import type { CreateProductVariables, CreateProductResult } from '@/ecommerce/application'

export type CreateProductServerUseCaseDependencies = {
  productsRepository: ProductsRepository
}

export class CreateProductServerUseCase extends CreateProductUseCase<CreateProductServerUseCaseDependencies> {
  async execute(product: CreateProductVariables): Promise<CreateProductResult> {

    return await this.dependencies.productsRepository.create(Products.create({
      name: product.name,
      description: product.description
    }))
  }
}