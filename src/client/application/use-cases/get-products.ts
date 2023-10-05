import { GetProductsUseCase } from '@/ecommerce/application'
import type { GetProductsResult } from '@/ecommerce/application'
import { ProductsRepository } from '@/ecommerce/domain'

export type GetProductsClientUseCaseDependencies = {
  productsRepository:ProductsRepository
}

export class GetProductsClientUseCase extends GetProductsUseCase<GetProductsClientUseCaseDependencies> {

  async execute(): Promise<GetProductsResult> {
    return await this.dependencies.productsRepository.findAll()
  }
}