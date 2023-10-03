import { UseCase } from '@/core/domain'
import { Product } from '@/ecommerce/domain'


export type GetProductsVariables = void

export interface GetProductsUseCase extends UseCase<GetProductsVariables, Product[]> {}