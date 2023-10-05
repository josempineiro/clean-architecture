'use client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import ApplicationContextProvider, { useApplicationContext } from '@/core/infrastructure/contexts/application-context'
import { EcommerceApplication } from '@/ecommerce/application';
import { devClientEcommerceApplication } from '@/client/infrastructure/graphql/graphql-context/dev-client-ecommerce-application';
import { testClientEcommerceApplication } from '@/client/infrastructure/graphql/graphql-context/test-client-ecommerce-application';
import { productiveClientEcommerceApplication } from '@/client/infrastructure/graphql/graphql-context/pro-client-ecommerce-application';

// TODO: get from env
const ENV = 'test'

const currentEcommerceApplicationProvider = (
  (ENV === 'development' && devClientEcommerceApplication) ||
  (ENV === 'test' && testClientEcommerceApplication) ||
  (ENV === 'production' && productiveClientEcommerceApplication)
)

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
})

export function useEcommerceApplication() {
  return useApplicationContext<EcommerceApplication>()
}

export default function EcommerceApplicationProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={client}>
      <ApplicationContextProvider<EcommerceApplication> application={currentEcommerceApplicationProvider}>
        {children}
      </ApplicationContextProvider>
    </QueryClientProvider>
  )
}