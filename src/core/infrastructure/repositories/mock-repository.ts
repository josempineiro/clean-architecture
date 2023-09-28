import { Repository } from '@/core/domain/repository'
import { Entity } from '@/core/domain/entity';

export abstract class MockRepository<T extends Entity> implements Repository<T> {
  private data: T[] = []
  public abstract create(entity: T): Promise<T>
  public abstract findById(id: string): Promise<T | undefined>
  public abstract update(entity: T): Promise<T>
  public abstract delete(id: string): Promise<void>
  public abstract findAll(): Promise<T[]>
  
  public getData(): T[] {
    return this.data
  }
  public setData(data: T[]): T[] {
    this.data = data
    return data
  }
}