import ApplicationContextProvider, { useApplicationContext } from '@/core/infrastructure/contexts/application-context'
import { EcommerceApplication } from '@/ecommerce/application';
import { clientEcommerceApplication } from '@/client/infrastructure/graphql/application';

export function useEcommerceApplication() {
  return useApplicationContext<EcommerceApplication>()
}

export default function EcommerceApplicationProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ApplicationContextProvider<EcommerceApplication> application={clientEcommerceApplication}>
      {children}
    </ApplicationContextProvider>
  )
}