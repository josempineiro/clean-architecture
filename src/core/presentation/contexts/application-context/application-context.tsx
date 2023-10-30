'use client'
import React, { createContext } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Application } from '@/core/domain'

export interface ApplicationContextValue<TApplication extends Application> {
  application: TApplication
}

export interface ApplicationProviderProps<TApplication extends Application> {
  children: React.ReactNode
  application: TApplication
}

export const ApplicationContext = createContext<Application | undefined>(
  undefined,
)

export function useApplication<
  TApplication extends Application,
>(): TApplication {
  const context = React.useContext(ApplicationContext)
  if (context === undefined) {
    throw new Error('useApplication must be used within a ApplicationProvider')
  }
  return context as TApplication
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
})

export function ApplicationProvider<TApplication extends Application>({
  children,
  application,
}: ApplicationProviderProps<TApplication>) {
  return (
    <QueryClientProvider client={client}>
      <ApplicationContext.Provider value={application}>
        {children}
      </ApplicationContext.Provider>
    </QueryClientProvider>
  )
}
