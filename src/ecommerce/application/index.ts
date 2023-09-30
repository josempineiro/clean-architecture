import { UseCase } from '@/core/domain/entities/use-case'
import { Application } from '@/core/domain/entities/application'
import { CreateProductUseCase } from '@/ecommerce/application/use-cases/create-product';
import { GetProductsUseCase } from '@/ecommerce/application/use-cases/get-products'

interface EcommerceUseCases extends Record<string, UseCase<any>> {
  getProducts: GetProductsUseCase,
  createProduct: CreateProductUseCase,
}

export interface EcommerceApplication extends Application<EcommerceUseCases> {}
