import { cloneDeep } from 'lodash'
import { Repository, Entity } from '@/core/domain'
import { EntityNotFound } from '@/core/domain'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export abstract class MockRepository<T extends Entity>
  implements Repository<T>
{
  public data: T[] = []
  public delay: number

  constructor(data: T[] = [], {
    delay = 600
  }: {
    delay: number
  } = {
    delay: 600
  }) {
    this.data = data
    this.delay = delay
  }

  public getId(entity: T): string {
    return entity.id as string
  }

  public async create(entity: T): Promise<T> {
    this.data.push(entity)
    await delay(this.delay)
    return Promise.resolve(entity)
  }

  public async getAll(): Promise<T[]> {
    await delay(this.delay)
    return Promise.resolve(this.getData())
  }

  public async getById(id: string): Promise<T> {
    const entity = this.data.find((entity) => this.getId(entity) === id)
    if (!entity) {
      throw new EntityNotFound('Entity', id)
    }
    await delay(this.delay)
    return Promise.resolve(entity)
  }

  public async updateById(id: string, entity: Partial<T>): Promise<T> {
    const updated = await this.getById(id)
    this.data = this.data.map((item) => {
      if (this.getId(item) === this.getId(updated)) {
        return {
          ...item,
          ...entity
        }
      }
      return item
    })
    return Promise.resolve(await this.getById(id))
  }

  public async deleteById(id: string): Promise<void> {
    const deleted = await this.getById(id)
    this.data = this.data.filter((entity) => this.getId(entity) !== this.getId(deleted))
    return Promise.resolve()
  }

  public getData(): T[] {
    return cloneDeep(this.data)
  }

  public setData(data: T[]): T[] {
    this.data = data
    return cloneDeep(data)
  }
}
