'use client'
import Link from 'next/link'
import { useGetProducts } from '@/ecommerce/presentation'
import { ProductCard } from '@/ecommerce/presentation/components/products/product-card'
import { ProductsGrid } from '@/ecommerce/presentation/components/products/products-grid'

export function ProductsView() {
  const { data: products, error, isLoading } = useGetProducts()
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {products && (
        <ProductsGrid
          products={products}
          renderProduct={({ product }) => (
            <Link href={`/products/${product.id}`}>
              <ProductCard key={product.id} product={product} />
            </Link>
          )}
        />
      )}
    </>
  )
}
