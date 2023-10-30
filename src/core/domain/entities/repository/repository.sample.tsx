import { Entity, EntityUtils } from '@/core/domain/entities'
import { MockRepository } from '@/core/infrastructure'
import { EntityNotFound } from '@/core/domain/errors'

export interface Product extends Entity {
  _type: 'Product'
  id: string
  name: string
}

export class ProductNotFound extends EntityNotFound {
  constructor(id: string) {
    super('product', id)
  }
}

export const ProductUtils: EntityUtils<Product> = {
  getId: (product) => product.id,
  is: (entity: any): entity is Product => entity._type === 'Product',
  create: (product) => ({
    id: `${Date.now()}`,
    name: '',
    _type: 'Product',
    ...product,
  }),
}

export class ProductsRepository extends MockRepository<Product> {
  constructor() {
    super([], { delay: 0 })
  }
}
