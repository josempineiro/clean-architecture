import { Product } from '@/ecommerce/domain'

export function ProductCard({
  product
}: {
  product: Product
}) {
  return (
    <div className="p-4 ring" key={product.id}>
      <div>{product.name}</div>
      <div>{product.description}</div>
    </div>
  )
}

export default ProductCard