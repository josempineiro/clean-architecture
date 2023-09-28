import { Repository } from '@/core/domain/repository'
import { Product } from '@/ecommerce/domain/entities/product'
import { GetProductsUseCase, GetProductsVariables } from '@/ecommerce/domain/use-cases/get-products'

export type GetProductsClientUseCaseDependencies = {
  productsRepository: Repository<Product>
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