
import { GraphqlRepository } from '@/core/infrastructure/repositories/graphql-repository'
import { Product as ProductType, CreateProductInput } from '@/client/infrastructure/graphql/generated'
import { Product as ProductDomain, Products } from '@/ecommerce/domain'
import { ProductGraphQLMapper } from '@/client/infrastructure/mappers/product-graphql-mapper';
import { getSdk } from '@/client/infrastructure/graphql/generated';

export class ProductsGraphqlRepository extends GraphqlRepository<ProductType, ProductDomain, CreateProductInput>  {
  constructor(uri = 'http://localhost:3000/graphql') {
    super(uri, new ProductGraphQLMapper())
  }

  create (product: ProductDomain) {
    return getSdk(this.client).createProduct({ input: this.mapper.toGraphqlInput(product)}).then(({ data }) => this.mapper.toEntity(data.createProduct as ProductGraphql))
  }
  findById (id: string) {
    return Promise.resolve(Products.create({
    id: 'string',
    name: 'string',
    description: 'string',
  }))
  }
  update (updated: ProductDomain) {
    return Promise.resolve(Products.create({
      id: 'string',
      name: 'string',
      description: 'string'
    }))
  }
  delete (id: string) {
    return Promise.resolve(Products.create({
      id: 'string',
      name: 'string',
      description: 'string',
    }))
  }
  findAll() {
    return getSdk(this.client).products().then(({ data }) => data.products?.map(product => this.mapper.toEntity(product as ProductGraphql)))
  }
}