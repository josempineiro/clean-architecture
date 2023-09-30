import { UseCase } from '@/core/domain/entities/use-case'
import { Product } from '@/ecommerce/domain/entities/product'


export interface GetProductsVariables {}

export interface GetProductsUseCase extends UseCase<void, Product[]> {}