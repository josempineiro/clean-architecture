import { Entity, EntityUtils } from '@/core/domain'

export interface Product extends Entity {
  _type: 'Product'
  id: string
  name: string
  description: string
}

export const ProductUtils: EntityUtils<Product> = {
  create: (product: Partial<Product>): Product => {
    return {
      _type: 'Product',
      id: new Date().getTime().toString(),
      name: '',
      description: '',
      ...product,
    }
  },
  is: (entity: any): entity is Product => {
    return entity._type === 'Product'
  },

}
