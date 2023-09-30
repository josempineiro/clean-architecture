import productiveEcommerceApplication from '@/client/application/productive-ecommerce-application'
import devEcommerceApplication from '@/client/application/dev-ecommerce-application'

const currentEcommerceApplicationProvider = process.env.NODE_ENV === 'production'
  ? productiveEcommerceApplication
  : devEcommerceApplication

export default currentEcommerceApplicationProvider