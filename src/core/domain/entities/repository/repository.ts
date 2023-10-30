import { Entity } from '@/core/domain/entities/entity'

export interface Repository<TEntity extends Entity> {
  getById(id: string): Promise<TEntity>;
  getAll(filter?: any): Promise<TEntity[]>;
  create(entity: Partial<TEntity>): Promise<TEntity>;
  updateById(id: string, entity: Partial<TEntity>): Promise<TEntity>;
  deleteById(id: string): Promise<void>;
}
