import { Product as ProductGraphql } from '@/client/infrastructure/graphql/generated'
import { Product as ProductDomain } from '@/ecommerce/domain'
import { GraphQLMapper } from "@/core/infrastructure/mappers/graphql-mapper";

export class ProductGraphQLMapper extends GraphQLMapper<ProductGraphql, ProductDomain> {
  toEntity(graphql: ProductGraphql): ProductDomain {
    return {
      __typename: 'Product',
      id: graphql.id,
      name: graphql.name,
      price: graphql.price,
      description: graphql.description,
      categories: [],
    }
  }

  toGraphql(entity: ProductDomain): ProductGraphql {
    return {
      __typename: 'Product',
      id: entity.id,
      name: entity.name,
      price: entity.price,
      description: entity.description,
      categories: [],
    }
  }
}