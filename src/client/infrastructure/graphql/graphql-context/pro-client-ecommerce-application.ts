import { CreateProductClientUseCase } from '@/client/application/use-cases/create-product';
import { GetProductsClientUseCase } from '@/client/application/use-cases/get-products'
import { ProductsGraphqlRepository } from '@/client/infrastructure/repositories/products-graphql-repository'
import { EcommerceApplication } from '@/ecommerce/application';

const productsGraphqlRepository = new ProductsGraphqlRepository()

export const productiveClientEcommerceApplication: EcommerceApplication =  {
  useCases: {
    getProducts: new GetProductsClientUseCase({
      productsRepository: productsGraphqlRepository
    }),
    createProduct: new CreateProductClientUseCase({
      productsRepository: productsGraphqlRepository
    })
  }
}

export default productiveClientEcommerceApplication