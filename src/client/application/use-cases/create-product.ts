import { Products } from '@/ecommerce/domain'
import { CreateProductUseCase } from '@/ecommerce/application'
import type { CreateProductVariables, CreateProductResult } from '@/ecommerce/application'
import type { ClientEcommerceApplicationDependencies } from '@/client/application'

export class CreateProductClientUseCase extends CreateProductUseCase<ClientEcommerceApplicationDependencies> {

  async execute(product: CreateProductVariables): Promise<CreateProductResult> {
    return await this.dependencies.productsRepository.create(Products.create(product))
  }
}