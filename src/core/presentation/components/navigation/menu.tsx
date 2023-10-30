import React, { forwardRef } from 'react'
import cn from 'classnames'
import { Link } from '@/core/presentation/components/navigation/link'
import { usePathname } from 'next/navigation'

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  active?: boolean
}

export interface MenuItemLinkProps extends React.HTMLAttributes<HTMLLIElement> {
  href: string
}

export function MenuItemContent({
  depth = 0,
  children,
  className,
}: {
  className?: string
  depth?: number
  children: React.ReactNode
}) {
  return (
    <div
      className={cn([
        className,
        'flex justify-between flex-1 items-center',
        {
          'ml-2 text-xl': depth === 1,
          'ml-4 text-lg': depth === 2,
          'ml-6 text-md': depth === 3,
          'ml-8 text-sm': depth === 4,
          'ml-10 text-xs': depth >= 5,
        },
      ])}
    >
      {children}
    </div>
  )
}

const menuItemClassNames = ({ active }: MenuItemProps) =>
  cn([
    'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group',
    active && 'font-bold',
  ])

export function MenuItemLink({
  href,
  children,
  className,
  ...rest
}: MenuItemLinkProps) {
  const pathname = usePathname()
  return (
    <li className={cn([className, 'flex flex-col'])} {...rest}>
      <Link
        href={href}
        className={cn([
          className,
          menuItemClassNames({ active: pathname === href }),
        ])}
      >
        {children}
      </Link>
    </li>
  )
}

export function MenuItem({ children, className, ...rest }: MenuItemProps) {
  return (
    <li
      className={cn([
        className,
        'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group',
      ])}
      {...rest}
    >
      {children}
    </li>
  )
}

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode
}

export const Menu = forwardRef(function Menu(
  { children, className, ...rest }: MenuProps,
  ref?: React.Ref<HTMLUListElement>,
) {
  return (
    <ul ref={ref} className={cn([className, 'flex flex-col'])} {...rest}>
      {children}
    </ul>
  )
})
