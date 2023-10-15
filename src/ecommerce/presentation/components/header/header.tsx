'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cn from 'classnames'
import { IconButton, MenuIcon, CrossIcon } from '@/core/presentation'

interface MenuLink {
  id: string
  text: string
  href: string
}

function useMenuLinks(): Array<MenuLink> {
  return [
    {
      id: 'home',
      text: 'Home',
      href: '/',
    },
    {
      id: 'blog',
      text: 'Blog',
      href: '/blog',
    },
    {
      id: 'architecture',
      text: 'Architecture viewer',
      href: '/architecture',
    },
    {
      id: 'admin',
      text: 'Admin',
      href: '/admin',
    },
  ]
}

export function Header() {
  const [visible, setVisible] = useState(false)
  const menuLinks = useMenuLinks()
  const pathname = usePathname()
  useEffect(() => {
    setVisible(false)
  }, [pathname])
  return (
    <header>
      <nav className="px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <Image
              width={24}
              height={24}
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              LemanDEV
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <IconButton
              type="button"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              onClick={() => setVisible(!visible)}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="w-6 h-6" />
            </IconButton>
          </div>
          <div
            style={
              {
                background: `var(--background)`,
              } as React.CSSProperties
            }
            className={cn([
              {
                hidden: !visible,
              },
              'px-4 lg:px-6 py-2.5 justify-between items-center w-full lg:flex lg:w-auto lg:order-1 fixed top-0 left-0 right-0 bottom-0 z-50 lg:static',
            ])}
            id="mobile-menu-2"
          >
            <div className="lg:hidden flex justify-end">
              <IconButton onClick={() => setVisible(!visible)} type="button">
                <CrossIcon className="w-6 h-6" />
                <span className="sr-only">Close modal</span>
              </IconButton>
            </div>
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {menuLinks.map((menuLink) => (
                <li key={menuLink.id}>
                  <Link
                    href={menuLink.href}
                    className={cn([
                      'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700',
                      {
                        'text-white lg:bg-transparent rounded bg-primary-700 lg:text-primary-700 lg:p-0 dark:text-white':
                          pathname === menuLink.href,
                      },
                    ])}
                    aria-current="page"
                  >
                    {menuLink.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
