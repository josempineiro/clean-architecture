'use client'

import React from 'react'
import cn from 'classnames'

interface SidebarProps {
  children: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <aside
      id="default-sidebar"
      className={cn(
        'fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0',
      )}
      aria-label="Sidenav"
    >
      {children}
    </aside>
  )
}
