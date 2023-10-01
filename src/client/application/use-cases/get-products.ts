import { Product, ProductsRepository } from '@/ecommerce/domain'
import { GetProductsUseCase } from '@/ecommerce/application'

export type GetProductsClientUseCaseDependencies = {
  productsRepository: ProductsRepository
}

export class GetProductsClientUseCase implements GetProductsUseCase {
  private dependencies: GetProductsClientUseCaseDependencies
  constructor(dependencies: GetProductsClientUseCaseDependencies) {
    this.dependencies = dependencies
  }

  async execute(): Promise<Product[]> {
    return await this.dependencies.productsRepository.findAll()
  }
}