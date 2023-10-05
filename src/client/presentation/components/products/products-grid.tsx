import { Product } from "@/server/infrastructure/graphql/generated"

export interface RenderProductProps {
  product: Product
  index: number
  products: Array<Product>
}

export interface ProductsGridProps {
  products: Array<Product>
  renderProduct: (props: RenderProductProps) => React.ReactNode
}

export function ProductsGrid({
  products,
  renderProduct
}: ProductsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product, index, products) => renderProduct({ product, index, products }))}  
    </div>
  )
}

export default ProductsGrid