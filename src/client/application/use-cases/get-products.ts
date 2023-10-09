import { GetProductsUseCase } from '@/ecommerce/application'
import type { GetProductsResult } from '@/ecommerce/application'
import type { ClientEcommerceApplicationDependencies } from '@/client/application'

export class GetProductsClientUseCase extends GetProductsUseCase<ClientEcommerceApplicationDependencies> {
  async execute(): Promise<GetProductsResult> {
    return await this.dependencies.productsRepository.findAll()
  }
}
