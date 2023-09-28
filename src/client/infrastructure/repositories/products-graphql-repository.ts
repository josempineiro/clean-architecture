
import { GraphqlRepository } from '@/core/infrastructure/repositories/graphql-repository'
import { Product as ProductGraphql } from '@/client/infrastructure/graphql/generated'
import { Product as ProductDomain } from '@/ecommerce/domain/entities/product'
import { ProductGraphQLMapper } from '@/client/infrastructure/mappers/graphql-product-mapper';
import { getSdk } from '@/ecommerce/infrastructure/graphql/generated/client';

export class ProductsGraphqlRepository extends GraphqlRepository<ProductGraphql, ProductDomain>  {
  constructor(uri = 'http://localhost:3000/graphql') {
    super(uri, new ProductGraphQLMapper())
  }

  create (product: ProductDomain) {
    throw new Error('Method not implemented.')
  }
  findById (id: string) {
    throw new Error('Method not implemented.')
  }
  update (updated: ProductDomain) {
    throw new Error('Method not implemented.')
  }
  delete (id: string) {
    throw new Error('Method not implemented.')
  }
  findAll() {
    return getSdk(this.client).products().then(({ data }) => data.products?.map(this.mapper.toEntity))
  }
}