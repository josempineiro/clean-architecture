import { ProductsRepository, ProductUtils } from '@/ecommerce/domain'
import { UpdateProductUseCase } from '@/ecommerce/application'
import type {
  UpdateProductVariables,
  UpdateProductResult,
} from '@/ecommerce/application'

export type UpdateProductServerUseCaseDependencies = {
  productsRepository: ProductsRepository
}

export class UpdateProductServerUseCase extends UpdateProductUseCase<UpdateProductServerUseCaseDependencies> {
  async execute({id , ...data }: UpdateProductVariables): Promise<UpdateProductResult> {
    console.log({ id , ...data })
    return await this.dependencies.productsRepository.updateById(id, data)
  }
}
