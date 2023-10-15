import { Form } from '@/core/domain'
import { Product } from '@/ecommerce/domain'
import { UpdateProductVariables } from '@/ecommerce/application'

export interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="w-full">
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
        {product.name}
      </h5>
      <p>{product.description}</p>
    </div>
  )
}
