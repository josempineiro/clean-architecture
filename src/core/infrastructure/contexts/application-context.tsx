'use client'
import React, { createContext } from 'react';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { Application } from '@/core/domain';

export interface ApplicationContextValue<TApplication extends Application> {
  application: TApplication;
};

export interface ApplicationContextProviderProps<TApplication extends Application> {
  children: React.ReactNode;
  application: TApplication;
}

export const ApplicationContext = createContext<Application | undefined>(undefined);

export function useApplicationContext<TApplication extends Application>(): TApplication {
  const context = React.useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      'useApplicationContext must be used within a ApplicationContextProvider'
    );
  }
  return context as TApplication;
}


const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
})

function ApplicationContextProvider<TApplication extends Application> ({
  children,
  application,
}: ApplicationContextProviderProps<TApplication>) {
  return   <QueryClientProvider client={client}>
    <ApplicationContext.Provider value={application}>
    {children}  
  </ApplicationContext.Provider>
  </QueryClientProvider>
};

export default ApplicationContextProvider;