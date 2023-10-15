import { Product as ProductDomain, ProductUtils } from '@/ecommerce/domain'
import { GraphqlRepository } from '@/core/infrastructure'
import {
  getSdk,
  Product as ProductType,
  CreateProductInput,
} from '@/shop/infrastructure/graphql/types'
import { ProductGraphQLMapper } from '@/shop/infrastructure/mappers/product-graphql-mapper'

export class ProductsGraphqlRepository extends GraphqlRepository<
  ProductType,
  ProductDomain,
  CreateProductInput
> {
  constructor(uri: string) {
    super(uri, new ProductGraphQLMapper())
  }
  create(product: ProductDomain) {
    return getSdk(this.client)
      .createProduct({ input: this.mapper.toGraphqlInput(product) })
      .then(({ data }) =>
        this.mapper.toEntity(data.createProduct as ProductType),
      )
  }
  findById(id: string) {
    return getSdk(this.client)
      .product({ id })
      .then(({ data }) => this.mapper.toEntity(data.product))
  }
  update(updated: ProductDomain) {
    return Promise.resolve(
      ProductUtils.create({
        id: 'string',
        name: 'string',
        description: 'string',
      }),
    )
  }
  delete(id: string) {
    return Promise.resolve(
      ProductUtils.create({
        id: 'string',
        name: 'string',
        description: 'string',
      }),
    )
  }
  findAll() {
    return getSdk(this.client)
      .products()
      .then(({ data }) =>
        data.products?.map((product) =>
          this.mapper.toEntity(product as ProductType),
        ),
      )
  }
}
