'use client'

import React, { useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CodeApplicationProvider } from '@/code/presentation'
import { CodeApplication } from '@/code/application'
import { CodeMockRepository } from '@/code/infrastructure'
import { IconButton, MenuIcon, Sidebar } from '@/core/presentation'

const codeApplication = new CodeApplication({
  codeRepository: new CodeMockRepository(),
})

interface CodeLayoutProps {
  children: React.ReactNode
}

function CodeLayout({ children }: CodeLayoutProps) {
  const path = usePathname()
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <CodeApplicationProvider application={codeApplication}>
      <IconButton
        aria-controls="default-sidebar"
        type="button"
        className="lg:hidden"
        onClick={() => setVisible(!visible)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="w-6 h-6" />
      </IconButton>

      <Sidebar visible={visible} id="default-sidebar" aria-label="Sidenav">
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <Link
            href="/code"
            className="flex items-center justify-between gap-2 p-6"
          >
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              CODE
            </span>
          </Link>
          <ul className="space-y-2">
            <li className="flex flex-col">
              <Link
                href="/code/products"
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
      </Sidebar>
      <div className="sm:pl-64 min-h-full flex flex-col">{children}</div>
    </CodeApplicationProvider>
  )
}
export default CodeLayout
