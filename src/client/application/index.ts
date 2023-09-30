import { CreateProductClientUseCase } from '@/client/application/use-cases/create-product';
import { GetProductsClientUseCase } from '@/client/application/use-cases/get-products'
import { ProductsDatastoreRepository } from '@/client/infrastructure/repositories/products-datastore-repository'
import { ProductsGraphqlRepository } from '@/client/infrastructure/repositories/products-graphql-repository'

const productsDatastoreRepository = new ProductsDatastoreRepository()

export const clientDevApplication = {
  useCases: {
    getProducts: new GetProductsClientUseCase({
      productsRepository: productsDatastoreRepository
    }),
    createProduct: new CreateProductClientUseCase({
      productsRepository: productsDatastoreRepository
    })
  }
}

const productsGraphqlRepository = new ProductsGraphqlRepository()


export const clientProductiveApplication = {
  useCases: {
    getProducts: new GetProductsClientUseCase({
      productsRepository: productsGraphqlRepository
    }),
    createProduct: new CreateProductClientUseCase({
      productsRepository: productsGraphqlRepository
    })
  }
}