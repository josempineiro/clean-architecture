import { GetProductsUseCase } from '@/ecommerce/application'
import type { GetProductsResult } from '@/ecommerce/application'
import type { ShopEcommerceApplicationDependencies } from '@/shop/application'

export class GetProductsShopUseCase extends GetProductsUseCase<ShopEcommerceApplicationDependencies> {
  async execute(): Promise<GetProductsResult> {
    return await this.dependencies.productsRepository.findAll()
  }
}
