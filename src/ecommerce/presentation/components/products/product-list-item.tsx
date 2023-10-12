'use client'
import { Product } from '@/ecommerce/domain'
import Image from 'next/image'
import Link from 'next/link'

interface ProductListItemProps {
  product: Product
}

export function ProductListItem({ product }: ProductListItemProps) {
  return (
    <li className="pb-3 sm:pb-4" key={product.id}>
      <Link href={`/admin/products/${product.id}`}>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Image
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/products/apple-watch.png"
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {product.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {product.description}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            $0
          </div>
        </div>
      </Link>
    </li>
  )
}
