import productiveEcommerceApplication from '@/client/infrastructure/context/productive-ecommerce-application'
import devEcommerceApplication from '@/client/infrastructure/context/dev-ecommerce-application'

const currentEcommerceApplicationProvider = process.env.NODE_ENV === 'production'
  ? productiveEcommerceApplication
  : devEcommerceApplication

export default currentEcommerceApplicationProvider