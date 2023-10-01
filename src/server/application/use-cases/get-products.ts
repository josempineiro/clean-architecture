import { Product, ProductsRepository } from '@/ecommerce/domain'

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