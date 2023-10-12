import { AdminProductDetailView } from '@/admin/presentation'

type AdminProductPageProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ERIDU: Admin product page',
}

function AdminProductPage(props: AdminProductPageProps) {
  return <AdminProductDetailView productId={props.params.id} />
}

export default AdminProductPage
