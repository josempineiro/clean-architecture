import { GraphQLMapper } from '@/core/infrastructure'
import { Product as ProductDomain } from '@/ecommerce/domain'
import {
  Product as ProductGraphql,
  CreateProductInput as CreateProductGraphqlInput,
} from '@/admin/infrastructure/graphql/types'

export class ProductGraphQLMapper extends GraphQLMapper<
  ProductGraphql,
  ProductDomain,
  CreateProductGraphqlInput
> {
  toEntity(graphql: ProductGraphql): ProductDomain {
    return {
      __typename: 'Product',
      id: graphql.id,
      name: graphql.name,
      description: graphql.description,
    }
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