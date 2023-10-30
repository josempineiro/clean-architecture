import { Sidebar } from '@/core/presentation'
import { CodeMenu } from '@/code/presentation/components/code-menu'

export function CodeSidebar() {
  return (
    <Sidebar visible={true}>
      <CodeMenu />
    </Sidebar>
  )
}
