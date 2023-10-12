'use client'
import Link from 'next/link'
import { CollectionViewSelector } from '@/core/presentation'
import {
  ProductListItem,
  ProductCard,
  ProductsCollection,
  CollectionView,
} from '@/ecommerce/presentation'
import { useGetProducts } from '@/admin/presentation'

export function AdminProductsListView({
  view = 'grid',
  onChangeView = function () {},
}: {
  view?: CollectionView
  onChangeView?: (view: CollectionView) => void
}) {
  const { data: products, error, isLoading } = useGetProducts()
  return (
    <>
      <div className="flex justify-end">
        <CollectionViewSelector value={view} onChange={onChangeView} />
      </div>
      {products && (
        <ProductsCollection
          view={view}
          products={products}
          renderProduct={(itemProps) => {
            if (view === 'list') {
              return (
                <Link href={`/admin/products/${itemProps.product.id}`}>
                  <ProductListItem {...itemProps} />
                </Link>
              )
            }
            if (view === 'grid') {
              return (
                <Link href={`/admin/products/${itemProps.product.id}`}>
                  <ProductCard {...itemProps} />
                </Link>
              )
            }
          }}
        />
      )}
    </>
  )
}
