'use client'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { Button } from '@/core/presentation'
import { CollectionView } from '@/ecommerce/presentation'
import { AdminProductsListView } from '@/admin/presentation'

function AdminProductsPage({ searchParams, ...rest }: any) {
  const router = useRouter()
  const view = searchParams.view as CollectionView

  function handleChangeView(view: CollectionView) {
    router.push(`/admin/products?view=${view}`)
  }

  return (
    <>
      <Head>
        <title>ERIDU: Admin products page</title>
      </Head>
      <Link className="fixed top-4 right-4" href="/admin/products/creation">
        <Button>Create product</Button>
      </Link>
      <AdminProductsListView view={view} onChangeView={handleChangeView} />
    </>
  )
}

export default AdminProductsPage
