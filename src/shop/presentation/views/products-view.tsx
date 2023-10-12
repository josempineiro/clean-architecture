'use client'
import Link from 'next/link'
import { useGetProducts } from '@/shop/presentation'
import { ProductCard, ProductsGrid } from '@/ecommerce/presentation'

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
            <Link href={`/shop/products/${product.id}`}>
              <ProductCard key={product.id} product={product} />
            </Link>
          )}
        />
      )}
    </>
  )
}
