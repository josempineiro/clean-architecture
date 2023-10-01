import { Repository } from '@/core/domain';
import { GraphQLClient } from 'graphql-request';
import { GraphQLMapper } from '@/core/infrastructure/mappers/graphql-mapper';

export abstract class GraphqlRepository<T, S> implements Repository<T> {
  protected mapper: GraphQLMapper<T, S>;
  protected client: GraphQLClient
  constructor(uri = 'http://localhost:3000/graphql', mapper: GraphQLMapper<T, S>) {
    this.client = new GraphQLClient(uri)
    this.mapper = mapper
  }
  abstract create (entity: T): Promise<T>
  abstract findById (id: string): Promise<T>
  abstract update (updated: T): Promise<T>
  abstract delete (id: string): Promise<T>
  abstract findAll (): Promise<T[]>
}