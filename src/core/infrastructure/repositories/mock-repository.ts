import { Repository, Entity } from '@/core/domain'

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

  public async create(entity: T): Promise<T> {
    this.data.push(entity)
    await delay(this.delay)
    return Promise.resolve(entity)
  }

  public async findAll(): Promise<T[]> {
    await delay(this.delay)
    return Promise.resolve(this.data)
  }

  public async findById(id: string): Promise<T> {
    const entity = this.data.find((entity) => entity.id === id)
    if (!entity) {
      throw `Entity with id ${id} not found`
    }
    await delay(this.delay)
    return Promise.resolve(entity)
  }

  public async updateById(id: string, entity: Partial<T>): Promise<T> {
    await delay(this.delay)
    this.data = this.data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...entity
        }
      }
      return item
    })
    return Promise.resolve(this.findById(id))
  }

  public async delete(id: string): Promise<void> {
    await delay(this.delay)
    this.data = this.data.filter((entity) => entity.id !== id)
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
