import { UpdateProductUseCase } from '@/ecommerce/application'
import type {
  UpdateProductVariables,
  UpdateProductResult,
} from '@/ecommerce/application'
import type { AdminApplicationDependencies } from '@/admin/application'

export class UpdateProductAdminUseCase extends UpdateProductUseCase<AdminApplicationDependencies> {
  async execute({ id, ...data }: UpdateProductVariables): Promise<UpdateProductResult> {
    return await this.dependencies.productsRepository.updateById(id, data)
  }
}
