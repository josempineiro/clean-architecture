import { ApplicationProvider, useApplication } from '@/core/presentation'
import {
  EcommerceApplication,
  EcommerceUseCases,
} from '@/ecommerce/application'

export function useEcommerceApplication<UseCases extends EcommerceUseCases>() {
  return useApplication<EcommerceApplication<UseCases>>()
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
    <ApplicationProvider<EcommerceApplication<UseCases>>
      application={application}
    >
      {children}
    </ApplicationProvider>
  )
}
