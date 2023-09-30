import { CreateProductClientUseCase } from '@/client/application/use-cases/create-product';
import { GetProductsClientUseCase } from '@/client/application/use-cases/get-products'
import { ProductsDatastoreRepository } from '@/client/infrastructure/repositories/products-datastore-repository'

const productsDatastoreRepository = new ProductsDatastoreRepository()

export const clientDevEcommerceApplication = {
  useCases: {
    getProducts: new GetProductsClientUseCase({
      productsRepository: productsDatastoreRepository
    }),
    createProduct: new CreateProductClientUseCase({
      productsRepository: productsDatastoreRepository
    })
  }
}

export default clientDevEcommerceApplication