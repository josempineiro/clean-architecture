import {
  EcommerceApplicationProvider,
  useEcommerceApplication,
} from '@/ecommerce/presentation'
import { ShopApplication, ShopApplicationUseCases } from '@/shop/application'

export function useShopApplication() {
  return useEcommerceApplication<ShopApplicationUseCases>()
}

export function ShopApplicationContext({
  children,
  application,
}: {
  children: React.ReactNode
  application: ShopApplication
}) {
  return (
    <EcommerceApplicationProvider application={application}>
      {children}
    </EcommerceApplicationProvider>
  )
}
