import { GetProductsUseCase } from '@/ecommerce/application'
import type { GetProductsResult } from '@/ecommerce/application'
import type { ShopApplicationDependencies } from '@/shop/application'

export class GetProductsShopUseCase extends GetProductsUseCase<ShopApplicationDependencies> {
  async execute(): Promise<GetProductsResult> {
    return await this.dependencies.productsRepository.getAll()
  }
}
