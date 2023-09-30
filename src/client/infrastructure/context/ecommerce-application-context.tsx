'use client'
import ApplicationContextProvider, { useApplicationContext } from '@/core/infrastructure/contexts/application-context'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { EcommerceApplication } from '@/ecommerce/application';


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
  children,
  application,
}: {
  children: React.ReactNode,
  application: EcommerceApplication
}) {
  return (
    <QueryClientProvider client={client}>
      <ApplicationContextProvider<EcommerceApplication> application={application}>
        {children}
      </ApplicationContextProvider>
    </QueryClientProvider>
  )
}