
import { GraphqlRepository } from '@/core/infrastructure/repositories/graphql-repository'
import { Product as ProductGraphql } from '@/client/infrastructure/graphql/generated'
import { Product as ProductDomain, create } from '@/ecommerce/domain/entities/product'
import { ProductGraphQLMapper } from '@/client/infrastructure/mappers/product-graphql-mapper';
import { getSdk } from '@/client/infrastructure/graphql/generated';

export class ProductsGraphqlRepository extends GraphqlRepository<ProductGraphql, ProductDomain>  {
  constructor(uri = 'http://localhost:3000/graphql') {
    super(uri, new ProductGraphQLMapper())
  }

  create (product: ProductDomain) {
    return Promise.resolve(product)
  }
  findById (id: string) {
    return Promise.resolve(create({
    id: 'string',
    name: 'string',
    description: 'string',
    categories: [],
    price: {
      value: 10,
      currency: 'EUR'
    }}))
  }
  update (updated: ProductDomain) {
    return Promise.resolve(create({
      id: 'string',
      name: 'string',
      description: 'string',
      categories: [],
      price: {
        value: 10,
        currency: 'EUR'
      }}))
  }
  delete (id: string) {
    return Promise.resolve(create({
      id: 'string',
      name: 'string',
      description: 'string',
      categories: [],
      price: {
        value: 10,
        currency: 'EUR'
      }}))
  }
  findAll() {
    return getSdk(this.client).products().then(({ data }) => data.products?.map(product => this.mapper.toEntity(product as ProductGraphql)))
  }
}