import { usePathname } from 'next/navigation'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, MenuItemLink, MenuItemContent, ChevronIcon } from '@/core/presentation'
import { DocWithChildren, DocUtils } from '@/docs/domain'
import { useGetDocs } from '@/docs/presentation/hooks'
import {
  NestedMenuProvider,
  useNestedMenu,
} from '@/core/presentation/contexts/nested-menu-context/nested-menu-context'


export function DocMenuItemLink({
  doc,
  className,
}: {
  doc: DocWithChildren
  className?: string
}) {
  const depth = doc.path.split('/').length
  return (
    <MenuItemLink className={className} href={'/' + doc.path}>
      <MenuItemContent depth={depth}>
          <span>{doc.name}</span>
      </MenuItemContent>
    </MenuItemLink>
  )
}

const AnimatedMenu = motion(Menu)

export function DocWithChildrenMenuItem({
  doc,
  className,
}: {
  doc: DocWithChildren
  className?: string
}) {
  const { isOpen } = useNestedMenu()
  const open = isOpen(doc.path)
  const depth = doc.path.split('/').length
  return (
    <>
      <MenuItemLink className={className} href={'/' + doc.path}>
        <MenuItemContent depth={depth}>
          <span>{doc.name}</span>
          <ChevronIcon
            className={cn([
              {
                'w-6 h-6': depth === 1,
                'w-5 h-5': depth === 2,
                'w-4 h-4': depth === 3,
                'w-3 h-3': depth >= 4,
              },
            ])}
            direction={open ? 'up' : 'down'}
          />
        </MenuItemContent>
      </MenuItemLink>
      <AnimatePresence initial={false}>
        {open && (
          <AnimatedMenu
            className={cn([
              'overflow-hidden',
              {
                'bg-gray-900': depth === 1,
                'bg-gray-800': depth === 2,
                'bg-gray-700': depth === 3,
                'bg-gray-600': depth === 4,
                'bg-gray-500': depth >= 5,
              },
            ])}
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {doc.children.map((child) => (
              <DocMenuItem key={child.path} doc={child} />
            ))}
          </AnimatedMenu>
        )}
      </AnimatePresence>
    </>
  )
}

export function DocMenuItem({
  doc,
  className,
}: {
  doc: DocWithChildren
  className?: string
}) {
  if (DocUtils.isDocWithChildren(doc)) {
    return <DocWithChildrenMenuItem doc={doc} className={className} />
  }
  return <DocMenuItemLink doc={doc} className={className} />
}

export function DocsMenu() {
  const { data: docs } = useGetDocs()
  const docsWithChildren = docs ? DocUtils.buildHierarchy(docs) : []
  const pathname = usePathname()

  if (!docs) {
    return 'Loading...'
  }
  return (
    <NestedMenuProvider<DocWithChildren>
      items={docsWithChildren}
      getItemId={DocUtils.getId}
      openedIds={pathname
        .split('/')
        .filter(Boolean)
        .map((slug, index, slugs) => slugs.slice(0, index + 1).join('/'))}
    >
      <Menu className="gap-2">
        {docsWithChildren.map((doc) => (
          <DocMenuItem key={doc.path} doc={doc} />
        ))}
      </Menu>
    </NestedMenuProvider>
  )
}
