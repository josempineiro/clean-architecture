import { GetProductUseCase } from '@/ecommerce/application'
import type {
  GetProductResult,
  GetProductVariables,
} from '@/ecommerce/application'
import type { ClientEcommerceApplicationDependencies } from '@/client/application'

export class GetProductClientUseCase extends GetProductUseCase<ClientEcommerceApplicationDependencies> {
  async execute({ id }: GetProductVariables): Promise<GetProductResult> {
    return await this.dependencies.productsRepository.findById(id)
  }
}
