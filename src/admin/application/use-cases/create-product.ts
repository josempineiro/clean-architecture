import { ProductUtils } from '@/ecommerce/domain'
import { CreateProductUseCase } from '@/ecommerce/application'
import type {
  CreateProductVariables,
  CreateProductResult,
} from '@/ecommerce/application'
import type { AdminApplicationDependencies } from '@/admin/application'

export class CreateProductAdminUseCase extends CreateProductUseCase<AdminApplicationDependencies> {
  async execute(product: CreateProductVariables): Promise<CreateProductResult> {
    return await this.dependencies.productsRepository.create(
      ProductUtils.create(product),
    )
  }
}
