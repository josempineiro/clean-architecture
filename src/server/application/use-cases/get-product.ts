import { ProductsRepository } from '@/ecommerce/domain'
import { GetProductUseCase } from '@/ecommerce/application'
import type {
  GetProductVariables,
  GetProductResult,
} from '@/ecommerce/application'

export type GetProductServerUseCaseDependencies = {
  productsRepository: ProductsRepository
}

export class GetProductServerUseCase extends GetProductUseCase<GetProductServerUseCaseDependencies> {
  async execute({ id }: GetProductVariables): Promise<GetProductResult> {
    return await this.dependencies.productsRepository.getById(id)
  }
}
