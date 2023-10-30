import { GraphQLClient } from '@/core/infrastructure/graphql/client'
import { Repository, Entity } from '@/core/domain'
import { GraphQLMapper } from '@/core/infrastructure/graphql/mapper'

export abstract class GraphqlRepository<T, D extends Entity, I> implements Repository<D> {
  protected mapper: GraphQLMapper<T, D, I>
  protected client: GraphQLClient
  constructor(
    uri = 'http://localhost:3000/graphql',
    mapper: GraphQLMapper<T, D, I>,
  ) {
    this.client = new GraphQLClient(uri)
    this.mapper = mapper
  }
  abstract create(entity: D): Promise<D>
  abstract getById(id: string): Promise<D>
  abstract updateById(id: string, updated: D): Promise<D>
  abstract deleteById(id: string): Promise<void>
  abstract getAll(): Promise<D[]>
}
