import {
  EcommerceApplicationProvider,
  useEcommerceApplication,
} from '@/ecommerce/presentation'
import { AdminApplication, AdminApplicationUseCases } from '@/admin/application'

export function useAdminApplication() {
  return useEcommerceApplication<AdminApplicationUseCases>()
}

export function AdminApplicationProvider({
  children,
  application,
}: {
  children: React.ReactNode
  application: AdminApplication
}) {
  return (
    <EcommerceApplicationProvider application={application}>
      {children}
    </EcommerceApplicationProvider>
  )
}
