import { CreateProductClientUseCase } from '@/client/application/use-cases/create-product';
import { GetProductsClientUseCase } from '@/client/application/use-cases/get-products'
import { ProductsMockRepository } from '@/client/infrastructure/repositories/products-mock-repository'
import { EcommerceApplication } from '@/ecommerce/application';
import { Products } from '@/ecommerce/domain';

const productsDatastoreRepository = new ProductsMockRepository()

export const testClientEcommerceApplication: EcommerceApplication = {
  useCases: {
    getProducts: new GetProductsClientUseCase({
      productsRepository: productsDatastoreRepository
    }),
    createProduct: new CreateProductClientUseCase({
      productsRepository: productsDatastoreRepository
    })
  }
}

export default testClientEcommerceApplication