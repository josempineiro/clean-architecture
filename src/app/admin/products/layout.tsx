'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumbs } from '@/core/presentation'

interface AdminLayoutProps {
  children: React.ReactNode
}

const NextBreadcrumb = ({
  path,
  children,
  className,
}: {
  path: string
  children: React.ReactNode
  className: string
}) => {
  return (
    <Link href={path} className={className}>
      {children}
    </Link>
  )
}

function AdminLayout({ children }: AdminLayoutProps) {
  const paths = usePathname()
  const pathNames = paths.split('/').filter((path) => path)
  return (
    <>
      <div className="flex p-6 gap-2 items-center">
        <Breadcrumbs
          className="flex-1"
          paths={pathNames}
          basepath={'admin'}
          Breadcrumb={NextBreadcrumb}
        >
          <NextBreadcrumb
            path={`/admin`}
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Admin
          </NextBreadcrumb>
        </Breadcrumbs>
      </div>
      <div className="flex-1 flex flex-col p-6 gap-6">{children}</div>
    </>
  )
}

export default AdminLayout
