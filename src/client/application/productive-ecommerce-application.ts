import { CreateProductClientUseCase } from '@/client/application/use-cases/create-product';
import { GetProductsClientUseCase } from '@/client/application/use-cases/get-products'
import { ProductsGraphqlRepository } from '@/client/infrastructure/repositories/products-graphql-repository'

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

export default clientProductiveApplication