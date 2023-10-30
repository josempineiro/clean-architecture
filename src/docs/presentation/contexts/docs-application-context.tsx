import { ApplicationProvider, useApplication } from '@/core/presentation'
import { DocsApplication } from '@/docs/application'

export function useDocsApplication() {
  return useApplication<DocsApplication>()
}

export function DocsApplicationProvider({
  children,
  application,
}: {
  children: React.ReactNode
  application: DocsApplication
}) {
  return (
    <ApplicationProvider application={application}>
      {children}
    </ApplicationProvider>
  )
}
