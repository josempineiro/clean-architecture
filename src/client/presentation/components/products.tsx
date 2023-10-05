'use client';

import { useProducts } from '@/client/presentation/hooks'
import ProductCard from '@/client/presentation/components/product-card'
import Link from "next/link";

export function Products() {
  const { data, error, isLoading } = useProducts()
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {data && (
        <div className="grid grid-cols-8 gap-4">
                <Link href="/admin/products/create">

        Create a new product
      </Link>
          {data.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  )
}

export default Products