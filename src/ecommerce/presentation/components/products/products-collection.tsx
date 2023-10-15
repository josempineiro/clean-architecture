import { Product } from '@/ecommerce/domain'
import {
  ProductsGrid,
  ProductsList,
} from '@/ecommerce/presentation/components/products'

export interface RenderProductCollectionProps {
  product: Product
  index: number
  products: Array<Product>
}

export interface ProductsCollectionProps {
  products: Array<Product>
  renderProduct: (props: RenderProductCollectionProps) => React.ReactNode
}

export type CollectionView = 'list' | 'grid'

export function ProductsCollection({
  view,
  ...props
}: ProductsCollectionProps & {
  view: CollectionView
}) {
  return view === 'list' ? (
    <ProductsList {...props} />
  ) : (
    <ProductsGrid
      {...props}
      cols={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
      gap={4}
    />
  )
}
