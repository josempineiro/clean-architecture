export abstract class GraphQLMapper<GraphQL, Entity, Input> {
  abstract toGraphql(entity: Entity): GraphQL
  abstract toEntity(graphql: GraphQL): Entity
  abstract toGraphqlInput(entity: Entity): Input
}
