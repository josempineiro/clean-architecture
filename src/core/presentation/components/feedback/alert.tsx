import React from 'react'
import cn from 'classnames'

export interface AlertProps {
  type: 'info' | 'danger' | 'success' | 'warning' | 'default'
  message: string
  className?: string
}

export const Alert = ({ type, message, className }: AlertProps) => {
  return (
    <div
      className={cn(
        className,
        'p-4',
        'text-sm',
        'font-medium',
        'rounded-lg',
        'dark:bg-gray-800',
        {
          'text-blue-800 bg-blue-50': type === 'info',
          'text-red-800 bg-red-50': type === 'danger',
          'text-green-800 bg-green-50': type === 'success',
          'text-yellow-800 bg-yellow-50': type === 'warning',
          'bg-gray-50': type === 'default',
        },
      )}
      role="alert"
    >
      <span>{message}</span>
    </div>
  )
}
