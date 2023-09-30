import { Product } from '@/ecommerce/domain/entities/product'
import { ProductsRepository } from '@/ecommerce/domain/repositories/products-repository'
import { GetProductsUseCase } from '@/ecommerce/application/use-cases/get-products'

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