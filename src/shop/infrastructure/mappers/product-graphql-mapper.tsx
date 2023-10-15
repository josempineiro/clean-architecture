import {
  Product as ProductGraphql,
  CreateProductInput as CreateProductGraphqlInput,
} from '@/shop/infrastructure/graphql/types'
import { Product as ProductDomain, ProductUtils } from '@/ecommerce/domain'
import { GraphQLMapper } from '@/core/infrastructure'

export class ProductGraphQLMapper extends GraphQLMapper<
  ProductGraphql,
  ProductDomain,
  CreateProductGraphqlInput
> {
  toEntity(graphql: ProductGraphql): ProductDomain {
    return ProductUtils.create({
      id: graphql.id,
      name: graphql.name,
      description: graphql.description,
    })
  }

  toGraphql(entity: ProductDomain): ProductGraphql {
    return {
      __typename: 'Product',
      id: entity.id,
      name: entity.name,
      description: entity.description,
    }
  }
  toGraphqlInput(entity: ProductDomain): CreateProductGraphqlInput {
    return {
      name: entity.name,
      description: entity.description,
    }
  }
}
