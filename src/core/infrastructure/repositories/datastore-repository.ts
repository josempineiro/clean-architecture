import { Repository } from '@/core/domain/repository'
import { Entity } from '@/core/domain/entity';

export class DatastoreRepository<T extends Entity> implements Repository<T>  {
  constructor(private key: string) {}
  
  public create (entity: T)  {
    const entities = this.getEntities<Array<T>>() || []
    entities.push({
      ...entity,
      id: new Date().getTime().toString(),
    })
    this.setEntities(entities)
    return Promise.resolve(entity)
  }

  public findById (id: string)  {
    const entities = this.getEntities<Array<T>>() || []
    const entity = entities.find(entity => entity.id === id)
    return Promise.resolve(entity)
  }

  public update (updated: T)   {
    const entities = this.getEntities<Array<T>>() || []
    this.setEntities(entities.map(entity => {
      if (entity.id === entity.id) {
        return updated
      }
      return entity
    }))
    return Promise.resolve(updated)
  }

  public delete (id: string) {
    const entities = this.getEntities<Array<T>>() || []
    const find = entities.find(entity => entity.id === id)
    if (!find) {
      throw 'Entity not found'
    }
    this.setEntities(entities.filter(entity => entity.id !== id))
    return Promise.resolve()
  }

  public findAll() {
    const entities = this.getEntities<Array<T>>() || []
    return Promise.resolve(entities)
  }
  
  public getEntities<T>(): T | undefined {
    const data = localStorage.getItem(this.key)
    if (data) {
      return JSON.parse(data)
    }
    return undefined
  }
  
  public setEntities<T>(data: T): T {
    localStorage.setItem(this.key, JSON.stringify(data))
    return data
  }
}