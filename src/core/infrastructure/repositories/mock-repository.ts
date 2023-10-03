import { Repository, Entity } from '@/core/domain';

export abstract class MockRepository<T extends Entity> implements Repository<T> {
  private data: T[] = []

  public create(entity: T): Promise<T> {
    this.data.push(entity)
    return Promise.resolve(entity)
  }

  public findById(id: string): Promise<T | undefined> {
    return Promise.resolve(this.data.find(entity => entity.id === id))
  }

  public update(entity: T): Promise<T> {
    this.data = this.data.map(item => {
      if (item.id === entity.id) {
        return entity
      }
      return item
    })
    return Promise.resolve(entity)
  }

  public delete(id: string): Promise<void> {
    this.data = this.data.filter(entity => entity.id !== id)
    return Promise.resolve()
  }

  public findAll(): Promise<T[]> {
    return Promise.resolve(this.data)
  }
  
  public getData(): T[] {
    return this.data
  }

  public setData(data: T[]): T[] {
    this.data = data
    return data
  }
}