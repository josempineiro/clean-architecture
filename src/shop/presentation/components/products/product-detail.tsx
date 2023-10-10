import { Product } from '@/ecommerce/domain'
import { ProductCard } from '@/shop/presentation/components/products/product-card'
export interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  return <ProductCard product={product} />
}

export default ProductDetail