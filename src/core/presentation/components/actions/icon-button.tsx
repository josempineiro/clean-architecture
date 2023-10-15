import cn from 'classnames'
import { Loader } from '@/core/presentation/components/icons'
export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export function IconButton({
  className,
  loading,
  children,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn([
        className,
        {
          ['opacity-60 pointer-events-none']: disabled,
        },
        'inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600',
      ])}
      {...props}
    >
      <span
        className={cn([
          {
            ['opacity-0']: loading,
            ['opacity-100']: !loading,
          },
        ])}
      >
        {children}
      </span>
      <span
        className={cn([
          {
            ['opacity-0']: !loading,
            ['opacity-100']: loading,
          },
          'absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
        ])}
      >
        <Loader aria-hidden="true" />
        <span className="sr-only">Loading...</span>
      </span>
    </button>
  )
}
