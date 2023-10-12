import { Product } from '@/ecommerce/domain'
import { ProductCard } from '@/ecommerce/presentation/components/products/product-card'
export interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  return <ProductCard product={product} />
}
