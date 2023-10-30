import { Sidebar } from '@/core/presentation'
import { DocsMenu } from '@/docs/presentation/components/docs/docs-menu'

export function DocsSidebar() {
  return (
    <Sidebar visible={true}>
      <DocsMenu />
    </Sidebar>
  )
}
