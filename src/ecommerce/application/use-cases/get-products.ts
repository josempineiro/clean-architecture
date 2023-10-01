import { UseCase } from '@/core/domain'
import { Product } from '@/ecommerce/domain'


export interface GetProductsVariables {}

export interface GetProductsUseCase extends UseCase<void, Product[]> {}