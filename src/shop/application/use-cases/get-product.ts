import { GetProductUseCase } from '@/ecommerce/application'
import type {
  GetProductResult,
  GetProductVariables,
} from '@/ecommerce/application'
import type { ShopEcommerceApplicationDependencies } from '@/shop/application'

export class GetProductShopUseCase extends GetProductUseCase<ShopEcommerceApplicationDependencies> {
  async execute({ id }: GetProductVariables): Promise<GetProductResult> {
    return await this.dependencies.productsRepository.findById(id)
  }
}
