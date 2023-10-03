import { UseCase } from '@/core/domain'
import { Repository } from '@/core/domain'
import { Product } from '@/ecommerce/domain'

export type CreateProductVariables = Product
export type CreateProductResult = Product
export type CreateProductDependencies = {
  productsRepository: Repository<Product>
}


export interface CreateProductUseCase extends UseCase<CreateProductVariables, CreateProductResult> {}