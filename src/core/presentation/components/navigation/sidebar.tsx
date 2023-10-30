'use client'
import React from 'react'
import cn from 'classnames'
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'

interface SidebarProps extends HTMLMotionProps<'aside'> {
  children: React.ReactNode
  visible: boolean
}

export function Sidebar({ children, visible, className, ...rest }: SidebarProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.aside

          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '-100%'}}
          className={cn(
            className,
            'fixed top-0 left-0 z-40 w-64 h-screen',
          )}
          {...rest}
        >
          {children}
        </motion.aside>
        )}
    </AnimatePresence>
  )
}
