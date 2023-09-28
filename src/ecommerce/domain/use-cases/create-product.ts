import { UseCase } from '@/core/domain/use-case'
import { Repository } from '@/core/domain/repository'
import { Product } from '@/ecommerce/domain/entities/product'

export type CreateProductDependencies = {
  productsRepository: Repository<Product>
}

export interface CreateProductUseCase extends UseCase<Product, Product> {}