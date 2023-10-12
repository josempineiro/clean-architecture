'use client'

import { useGetProduct } from '@/ecommerce/presentation'
import { ProductDetail } from '@/shop/presentation/components/products/product-detail'
export interface AdminProductDetailViewProps {
  productId: string
}

export function AdminProductDetailView({
  productId,
}: AdminProductDetailViewProps) {
  const {
    data: product,
    error,
    isLoading,
  } = useGetProduct({
    variables: {
      id: decodeURI(productId),
    },
  })
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {product && <ProductDetail product={product} />}
    </>
  )
}
