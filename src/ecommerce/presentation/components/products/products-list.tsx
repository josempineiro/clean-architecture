'use client'
import { Product } from '@/ecommerce/domain'
import { ProductsCollectionProps } from '@/ecommerce/presentation/components/products/products-collection'

export interface ProductsListProps extends ProductsCollectionProps {}

export function ProductsList({ products, renderProduct }: ProductsListProps) {
  return (
    <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
      {products.map((product, index, products) =>
        renderProduct({ product, index, products }),
      )}
    </ul>
  )
}
