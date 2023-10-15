'use client'

import React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AdminApplicationContext } from '@/admin/presentation'
import { AdminApplication } from '@/admin/application'
import { productsRepository } from '@/admin/infrastructure'
import { IconButton, MenuIcon } from '@/core/presentation'

const adminApplication = new AdminApplication({
  productsRepository,
})

interface AdminLayoutProps {
  children: React.ReactNode
}

function AdminLayout({ children }: AdminLayoutProps) {
  const paths = usePathname()
  const pathNames = paths.split('/').filter((path) => path)
  return (
    <AdminApplicationContext application={adminApplication}>
      <IconButton
        aria-controls="default-sidebar"
        type="button"
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="w-6 h-6" />
      </IconButton>

      <aside
        id="default-sidebar"
        className={cn(
          'fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0',
        )}
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <Link
            href="/admin"
            className="flex items-center justify-between gap-2 p-6"
          >
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              ERIDU
            </span>
          </Link>
          <ul className="space-y-2">
            <li className="flex flex-col">
              <Link
                href="/admin/products"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="products-pages"
                data-collapse-toggle="products-pages"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Products
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="sm:pl-64 min-h-full flex flex-col">{children}</div>
    </AdminApplicationContext>
  )
}
export default AdminLayout
