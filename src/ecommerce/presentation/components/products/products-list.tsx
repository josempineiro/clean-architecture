'use client'
import { List } from '@/core/presentation'
import { ProductsCollectionProps } from '@/ecommerce/presentation/components/products/products-collection'

export interface ProductsListProps extends ProductsCollectionProps {}

export function ProductsList({ products, renderProduct }: ProductsListProps) {
  return (
    <List divide>
      {products.map((product, index, products) =>
        renderProduct({ product, index, products }),
      )}
    </List>
  )
}
