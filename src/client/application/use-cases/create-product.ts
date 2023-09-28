import { Repository } from '@/core/domain/repository'
import { Product } from '@/ecommerce/domain/entities/product'
import { CreateProductUseCase } from '@/ecommerce/domain/use-cases/create-product'

export type CreateProductClientUseCaseDependencies = {
  productsRepository: Repository<Product>
}

export class CreateProductClientUseCase implements CreateProductUseCase {
  constructor(
    private readonly dependencies: CreateProductClientUseCaseDependencies
  ) {}

  async execute(product: Product): Promise<Product> {
    return await this.dependencies.productsRepository.create(product)
  }
}