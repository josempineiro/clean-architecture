import { GetProductsUseCase } from '@/ecommerce/application'
import type { GetProductsResult } from '@/ecommerce/application'
import type { AdminApplicationDependencies } from '@/admin/application'

export class GetProductsAdminUseCase extends GetProductsUseCase<AdminApplicationDependencies> {
  async execute(): Promise<GetProductsResult> {
    return await this.dependencies.productsRepository.getAll()
  }
}
