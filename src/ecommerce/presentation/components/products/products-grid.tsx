import { Product } from '@/ecommerce/domain'
import { ProductsCollectionProps } from '@/ecommerce/presentation/components/products/products-collection'

export interface ProductsGridProps extends ProductsCollectionProps {}

export function ProductsGrid({ products, renderProduct }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product, index, products) =>
        renderProduct({ product, index, products }),
      )}
    </div>
  )
}
