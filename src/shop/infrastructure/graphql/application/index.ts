import { EcommerceApplication } from '@/ecommerce/application'
import { devShopEcommerceApplication } from '@/shop/infrastructure/graphql/application/dev-shop-application'
import { testShopEcommerceApplication } from '@/shop/infrastructure/graphql/application/test-shop-application'
import { productiveShopEcommerceApplication } from '@/shop/infrastructure/graphql/application/pro-shop-application'

type Environment = 'development' | 'test' | 'production'

// TODO: get from env
const ENV: Environment = 'production' as Environment

export const shopEcommerceApplication = ((ENV === 'test' &&
  testShopEcommerceApplication) ||
  (ENV === 'development' && devShopEcommerceApplication) ||
  (ENV === 'production' &&
    productiveShopEcommerceApplication)) as EcommerceApplication
