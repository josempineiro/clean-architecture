import { Repository, Entity } from '@/core/domain';

export abstract class MockRepository<T extends Entity> implements Repository<T> {
  public data: T[] = []

  constructor(data: T[] = []) {
    this.data = data
  }
  public create(entity: T): Promise<T> {
    this.data.push(entity)
    return Promise.resolve(entity)
  }

  public findAll(): Promise<T[]> {
    return Promise.resolve(this.data)
  }

  public findById(id: string): Promise<T> {
    const entity = this.data.find(entity => entity.id === id)
    if (!entity) {
      throw `Entity with id ${id} not found`
    }
    return Promise.resolve(entity)
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
  
  public getData(): T[] {
    return this.data
  }

  public setData(data: T[]): T[] {
    this.data = data
    return data
  }
}