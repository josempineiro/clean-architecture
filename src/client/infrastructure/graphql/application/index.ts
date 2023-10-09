import { EcommerceApplication } from '@/ecommerce/application'
import { devClientEcommerceApplication } from '@/client/infrastructure/graphql/application/dev-client-ecommerce-application'
import { testClientEcommerceApplication } from '@/client/infrastructure/graphql/application/test-client-ecommerce-application'
import { productiveClientEcommerceApplication } from '@/client/infrastructure/graphql/application/pro-client-ecommerce-application'

type Environment = 'development' | 'test' | 'production'

// TODO: get from env
const ENV: Environment = 'production' as Environment

export const clientEcommerceApplication = ((ENV === 'test' &&
  testClientEcommerceApplication) ||
  (ENV === 'development' && devClientEcommerceApplication) ||
  (ENV === 'production' &&
    productiveClientEcommerceApplication)) as EcommerceApplication
