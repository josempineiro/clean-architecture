'use client'

import { useGetProduct } from '@/admin/presentation'
import {
  ProductDetailEditor,
  ProductDetailSkeleton,
} from '@/admin/presentation/components'

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
      {isLoading && <ProductDetailSkeleton />}
      {error && <div>Error</div>}
      {!isLoading && product && <ProductDetailEditor product={product} />}
    </>
  )
}
