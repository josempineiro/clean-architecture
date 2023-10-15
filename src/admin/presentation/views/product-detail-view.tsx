'use client'

import { useGetProduct } from '@/admin/presentation'
import { ProductDetailEditor } from '@/admin/presentation/components/products/product-detail-editor'

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
      {product && <ProductDetailEditor product={product} />}
    </>
  )
}
