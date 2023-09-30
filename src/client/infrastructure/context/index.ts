import ProductiveEcommerceApplicationProvider from '@/client/infrastructure/context/productive-ecommerce-application-context'
import DevEcommerceApplicationProvider from '@/client/infrastructure/context/dev-ecommerce-application-context'
import EcommerceApplicationProvider from '@/client/infrastructure/context/ecommerce-application-context'

const CurrentEcommerceApplicationProvider = process.env.NODE_ENV === 'production'
  ? ProductiveEcommerceApplicationProvider
  : DevEcommerceApplicationProvider

export default CurrentEcommerceApplicationProvider