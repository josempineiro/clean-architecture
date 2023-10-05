import { Entity } from '@/core/domain'

export interface Product extends Entity {
  __typename: 'Product'
  id: string
  name: string
  description: string
}

export const Products = {
  create: (product: Partial<Product>): Product => {
    return {
      __typename: 'Product',
      id: new Date().getTime().toString(),
      name: '',
      description: '',
      ...product,
    }
  }
}