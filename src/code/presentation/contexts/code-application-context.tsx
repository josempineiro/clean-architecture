import { ApplicationProvider, useApplication } from '@/core/presentation'
import { CodeApplication } from '@/code/application'

export function useCodeApplication() {
  return useApplication<CodeApplication>()
}

export function CodeApplicationProvider({
  children,
  application,
}: {
  children: React.ReactNode
  application: CodeApplication
}) {
  return (
    <ApplicationProvider application={application}>
      {children}
    </ApplicationProvider>
  )
}
