import { GetProductUseCase } from '@/ecommerce/application'
import type {
  GetProductResult,
  GetProductVariables,
} from '@/ecommerce/application'
import type { ShopApplicationDependencies } from '@/shop/application'

export class GetProductShopUseCase extends GetProductUseCase<ShopApplicationDependencies> {
  async execute({ id }: GetProductVariables): Promise<GetProductResult> {
    return await this.dependencies.productsRepository.getById(id)
  }
}
