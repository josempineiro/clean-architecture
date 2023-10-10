import { GetProductUseCase } from '@/ecommerce/application'
import type {
  GetProductResult,
  GetProductVariables,
} from '@/ecommerce/application'
import type { AdminApplicationDependencies } from '@/admin/application'

export class GetProductAdminUseCase extends GetProductUseCase<AdminApplicationDependencies> {
  async execute({ id }: GetProductVariables): Promise<GetProductResult> {
    return await this.dependencies.productsRepository.findById(id)
  }
}
