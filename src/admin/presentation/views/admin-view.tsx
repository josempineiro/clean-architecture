'use client'
import Link from 'next/link'
import { useGetProducts } from '@/admin/presentation'
import { Loader, ProductIcon } from '@/core/presentation'

export function AdminView() {
  const { data: products, error, isLoading } = useGetProducts()
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Link href="/admin/products">
          <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col items-center p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full">
                <ProductIcon />
              </div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {isLoading && <Loader />}
                {products && products.length}
                {error && 'Error retrieving products'}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Total products
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
