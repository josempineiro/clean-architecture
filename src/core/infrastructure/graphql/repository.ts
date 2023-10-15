import { GraphQLClient } from '@/core/infrastructure/graphql/client'
import { Repository } from '@/core/domain'
import { GraphQLMapper } from '@/core/infrastructure/graphql/mapper'

export abstract class GraphqlRepository<T, D, I> implements Repository<T> {
  protected mapper: GraphQLMapper<T, D, I>
  protected client: GraphQLClient
  constructor(
    uri = 'http://localhost:3000/graphql',
    mapper: GraphQLMapper<T, D, I>,
  ) {
    this.client = new GraphQLClient(uri)
    this.mapper = mapper
  }
  abstract create(entity: T): Promise<T>
  abstract findById(id: string): Promise<T>
  abstract updateById(id: string, updated: Partial<T>): Promise<T>
  abstract delete(id: string): Promise<T>
  abstract findAll(): Promise<T[]>
}
