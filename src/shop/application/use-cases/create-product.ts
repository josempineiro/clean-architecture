import { Products } from '@/ecommerce/domain'
import { CreateProductUseCase } from '@/ecommerce/application'
import type {
  CreateProductVariables,
  CreateProductResult,
} from '@/ecommerce/application'
import type { ShopEcommerceApplicationDependencies } from '@/shop/application'

export class CreateProductShopUseCase extends CreateProductUseCase<ShopEcommerceApplicationDependencies> {
  async execute(product: CreateProductVariables): Promise<CreateProductResult> {
    return await this.dependencies.productsRepository.create(
      Products.create(product),
    )
  }
}
