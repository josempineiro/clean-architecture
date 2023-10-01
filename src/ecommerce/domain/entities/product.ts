import { Entity } from '@/core/domain'
import { Category } from '@/ecommerce/domain/entities/category'

export interface Price {
  value: number
  currency: string
}

export interface Product extends Entity {
  __typename: 'Product'
  id: string
  name: string
  description: string
  categories: Category[]
  price: {
    value: number
    currency: string
  }
}

export const create = (product: Partial<Product>): Product => {
  return {
    __typename: 'Product',
    id: 'ID::' + new Date().getTime().toString(),
    name: '',
    description: '',
    categories: [],
    price: {
      value: 0,
      currency: '',
    },
    ...product,
  }
}