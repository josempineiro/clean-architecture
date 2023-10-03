import { Product, ProductsRepository } from '@/ecommerce/domain'
import { GetProductsUseCase } from '@/ecommerce/application'

export type CreateProductServerUseCaseDependencies = {
  productsRepository: ProductsRepository
}

export class GetProductsServerUseCase implements GetProductsUseCase {
  constructor(
    private readonly dependencies: CreateProductServerUseCaseDependencies
  ) {}

  async execute(): Promise<Product[]> {
    return this.dependencies.productsRepository.findAll()
  }
}