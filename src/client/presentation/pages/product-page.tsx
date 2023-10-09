'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useGetProduct } from '@/client/presentation/hooks'
import { ProductDetail } from '@/client/presentation/components/products/product-detail'

export function ProductPage() {
  const params = useParams<{
    ['product-id']: string
  }>()
  const {
    data: product,
    error,
    isLoading,
  } = useGetProduct({
    variables: {
      id: decodeURI(params['product-id'] as string),
    },
  })
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {product && (
        <div className="flex flex-col gap-4">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-5 py-2 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            ← Go back to products
          </Link>
          <ProductDetail product={product} />
        </div>
      )}
    </>
  )
}
