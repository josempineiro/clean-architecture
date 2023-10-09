import { ApplicationContextProvider, useApplicationContext } from '@/core/presentation'
import { EcommerceApplication } from '@/ecommerce/application';

export function useEcommerceApplication() {
  return useApplicationContext<EcommerceApplication>()
}

export function EcommerceApplicationProvider({
  children,
  application
}: {
  children: React.ReactNode
  application: EcommerceApplication
}) {
  return (
    <ApplicationContextProvider<EcommerceApplication> application={application}>
      {children}
    </ApplicationContextProvider>
  )
}