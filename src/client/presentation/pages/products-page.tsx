'use client'
import Link from 'next/link'
import { useGetProducts } from '@/client/presentation/hooks'
import { ProductCard } from '@/client/presentation/components/products/product-card'
import { ProductsGrid } from '@/client/presentation/components/products/products-grid'

export function ProductsPage() {
  const { data: products, error, isLoading } = useGetProducts()
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {products && (
        <div className="flex flex-col gap-4">
          <Link
            className="w-full text-center text-3xl p-5 block bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            href="/products/create"
          >
            {'+'}
          </Link>
          <ProductsGrid
            products={products}
            renderProduct={({ product }) => (
              <ProductCard key={product.id} product={product} />
            )}
          />
        </div>
      )}
    </>
  )
}
