import { UseCase } from '@/core/domain';
import { ProductsRepository } from '@/ecommerce/domain'
import { GetProductsUseCase, CreateProductUseCase } from '@/ecommerce/application';
export * from '@/server/application/use-cases';

export interface ServerApplicationDependencies {
  productsRepository: ProductsRepository;
}

export interface ServerApplicationUseCases extends Record<string, UseCase<any, any>> {
  getProducts: GetProductsUseCase<ServerApplicationDependencies>;
  createProduct: CreateProductUseCase<ServerApplicationDependencies>;
}