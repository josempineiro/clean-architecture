import { ProductsRepository } from '@/ecommerce/domain/repositories/products-repository'
import { ProductsDatastoreRepository } from '@/admin/infrastructure/repositories/products-repository/products-datastore-repository'
import { ProductsGraphqlRepository } from '@/admin/infrastructure/repositories/products-repository/products-graphql-repository'
import { ProductsMockRepository } from '@/admin/infrastructure/repositories/products-repository/products-mock-repository'

type Environment = 'development' | 'test' | 'production'

// TODO: get from env
const ENV: Environment = 'production' as Environment

export const productsRepository = (
  (ENV === 'test' && new ProductsMockRepository()) ||
  (ENV === 'development' && new ProductsDatastoreRepository()) ||
  (ENV === 'production' && new ProductsGraphqlRepository('/graphql'))
) as ProductsRepository
