'use client'

import { DocsMenu } from '@/docs/presentation'
import { DocsApplication } from '@/docs/application'
import { DocsApplicationProvider } from '@/docs/presentation'
import { docsRepository } from '@/docs/infrastructure'

const docsApplication = new DocsApplication({
  docsRepository,
})

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsApplicationProvider application={docsApplication}>
      <div className="flex flex-row">
        <aside className="w-64 h-full">
          <DocsMenu />
        </aside>
        <section className="pb-32 w-full">{children}</section>
      </div>
    </DocsApplicationProvider>
  )
}

export default Layout
