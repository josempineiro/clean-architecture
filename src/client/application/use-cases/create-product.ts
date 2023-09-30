import { Product } from '@/ecommerce/domain/entities/product'
import { ProductsRepository } from '@/ecommerce/domain/repositories/products-repository'
import { CreateProductUseCase } from '@/ecommerce/application/use-cases/create-product'

export type CreateProductClientUseCaseDependencies = {
  productsRepository:ProductsRepository
}

export class CreateProductClientUseCase implements CreateProductUseCase {
  constructor(
    private readonly dependencies: CreateProductClientUseCaseDependencies
  ) {}

  async execute(product: Product): Promise<Product> {
    return await this.dependencies.productsRepository.create(product)
  }
}