'use client'

import { createContext, useState, useContext } from 'react'

export interface NestedMenuContextValue {
  openMenu: (id: string) => void
  closeMenu: (id: string) => void
  closeAllMenus: () => void
  openAllMenus: () => void
  isOpen: (id: string) => boolean
}

export const NestedMenuContext = createContext<
  NestedMenuContextValue | undefined
>(undefined)

export function useNestedMenu() {
  const context = useContext(NestedMenuContext)
  if (context === undefined) {
    throw new Error('useNestedMenu must be used within a NestedMenuProvider')
  }
  return context
}

export interface NestedMenuProviderProps<TMenuItem> {
  children: React.ReactNode
  items: Array<TMenuItem>
  getItemId: (item: TMenuItem) => string
  openedIds?: Array<string>
}

export function NestedMenuProvider<TMenuItem>({
  children,
  items,
  getItemId,
  openedIds = [],
}: NestedMenuProviderProps<TMenuItem>) {
  const [openMenus, setOpenMenus] = useState<Array<string>>([])

  const openMenu = (id: string) => {
    setOpenMenus((openedIds) => [id, ...openedIds])
  }

  const closeMenu = (closedId: string) => {
    setOpenMenus((openedIds) => openedIds.filter((id) => id !== closedId))
  }

  const closeAllMenus = () => {
    setOpenMenus([])
  }

  const isOpen = (id: string) => {
    return openMenus.includes(id) || openedIds.includes(id)
  }

  const openAllMenus = () => {
    setOpenMenus(items.map(getItemId))
  }

  return (
    <NestedMenuContext.Provider
      value={{
        openMenu,
        closeMenu,
        closeAllMenus,
        openAllMenus,
        isOpen,
      }}
    >
      {children}
    </NestedMenuContext.Provider>
  )
}
