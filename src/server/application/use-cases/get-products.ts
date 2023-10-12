import { ProductsRepository } from '@/ecommerce/domain'
import { GetProductsUseCase } from '@/ecommerce/application'
import type {
  GetProductsVariables,
  GetProductsResult,
} from '@/ecommerce/application'

export type GetProductsServerUseCaseDependencies = {
  productsRepository: ProductsRepository
}

export class GetProductsServerUseCase extends GetProductsUseCase<GetProductsServerUseCaseDependencies> {
  async execute(variables: GetProductsVariables): Promise<GetProductsResult> {
    return await this.dependencies.productsRepository.findAll()
  }
}
