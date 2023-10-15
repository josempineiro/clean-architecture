import { ProductsCollectionProps } from '@/ecommerce/presentation/components/products/products-collection'
import { Grid } from '@/core/presentation'
import type { GridProps } from '@/core/presentation'

export interface ProductsGridProps
  extends ProductsCollectionProps,
    Omit<GridProps, 'children'> {}

export function ProductsGrid({
  products,
  renderProduct,
  ...gridProps
}: ProductsGridProps) {
  return (
    <Grid {...gridProps}>
      {products.map((product, index, products) =>
        renderProduct({ product, index, products }),
      )}
    </Grid>
  )
}
