import { Product } from '@/ecommerce/domain'

interface ProductListItemProps {
  product: Product
}

export function ProductListItem({ product }: ProductListItemProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          {product.name}
        </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          {product.description}
        </p>
      </div>
    </div>
  )
}
