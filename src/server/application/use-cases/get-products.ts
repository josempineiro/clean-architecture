import { Product } from '@/ecommerce/domain/entities/product'
import { ProductsRepository } from '@/ecommerce/domain/repositories/products-repository'

export interface GetProducts {
  execute(): Promise<Product[]>
}

export class GetProductsUseCase implements GetProducts {
  constructor(
    private readonly productRepository: ProductsRepository
  ) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll()
  }
}