import { Product, ProductsRepository } from '@/ecommerce/domain'
import { GetProductsUseCase } from '@/ecommerce/application'

export type GetProductsServerUseCaseDependencies = {
  productsRepository: ProductsRepository
}

export class GetProductsServerUseCase implements GetProductsUseCase {
  constructor(
    private readonly dependencies: GetProductsServerUseCaseDependencies
  ) {}

  async execute(): Promise<Product[]> {
    return this.dependencies.productsRepository.findAll()
  }
}