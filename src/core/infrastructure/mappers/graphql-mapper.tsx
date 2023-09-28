export abstract class GraphQLMapper<GraphQL, Entity>  {
  abstract toGraphql(entity: Entity): GraphQL
  abstract toEntity(graphql: GraphQL): Entity
}