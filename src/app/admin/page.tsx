import { Metadata } from 'next'
import { AdminView } from '@/admin/presentation'

export const metadata: Metadata = {
  title: 'ERIDU: Admin page',
}

function AdminPage() {
  return <AdminView />
}

export default AdminPage
