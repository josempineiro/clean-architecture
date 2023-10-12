import React from 'react'
import cn from 'classnames'

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  basepath: string
  paths: string[]
  className?: string
  Breadcrumb: React.ElementType
}

const ChevronIcon = () => (
  <svg
    className="w-3 h-3 text-gray-400"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 6 10"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m1 9 4-4-4-4"
    />
  </svg>
)

export const Breadcrumbs = ({
  children,
  paths,
  basepath,
  className,
  Breadcrumb,
  ...rest
}: BreadcrumbProps) => {
  return (
    <nav className={cn([className, 'flex'])} aria-label="Breadcrumb" {...rest}>
      <ol className="inline-flex items-center gap-2">
        <li className="inline-flex items-center">{children}</li>
        {paths
          .filter((link) => basepath !== link)
          .map((link, index) => {
            const path = `/${basepath}/${paths.slice(1, index + 2).join('/')}`
            const itemLink = link[0].toUpperCase() + link.slice(1, link.length)
            return (
              <React.Fragment key={index}>
                <li>
                  <div className="flex items-center gap-2">
                    <ChevronIcon />
                    <Breadcrumb
                      path={path}
                      className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      {itemLink}
                    </Breadcrumb>
                  </div>
                </li>
              </React.Fragment>
            )
          })}
      </ol>
    </nav>
  )
}
