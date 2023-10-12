import cn from 'classnames'
import { Loader } from '@/core/presentation/components/icons'
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export function Button({
  className,
  loading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn([
        className,
        {
          ['opacity-60 pointer-events-none']: disabled,
        },
        'relative inline-flex items-center justify-center uppercase gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
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
