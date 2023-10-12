import {
  ApplicationContextProvider,
  useApplicationContext,
} from '@/core/presentation'
import {
  EcommerceApplication,
  EcommerceUseCases,
} from '@/ecommerce/application'

export function useEcommerceApplication<UseCases extends EcommerceUseCases>() {
  return useApplicationContext<EcommerceApplication<UseCases>>()
}

export function EcommerceApplicationProvider<
  UseCases extends EcommerceUseCases,
>({
  children,
  application,
}: {
  children: React.ReactNode
  application: EcommerceApplication<UseCases>
}) {
  return (
    <ApplicationContextProvider<EcommerceApplication<UseCases>>
      application={application}
    >
      {children}
    </ApplicationContextProvider>
  )
}
