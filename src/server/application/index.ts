import { UseCase } from '@/core/domain';
import { GetProductsUseCase, CreateProductUseCase } from '@/ecommerce/application';
export * from '@/server/application/use-cases';

export interface ServerApplicationUseCases extends Record<string, UseCase<any, any>> {
  getProducts: GetProductsUseCase;
  createProduct: CreateProductUseCase;
}