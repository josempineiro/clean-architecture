import React from 'react'
import cn from 'classnames'

export interface BaseFieldProps {
  name?: string
  label?: React.ReactNode
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

export function BaseField({
  name,
  label,
  children,
  disabled,
  className,
}: BaseFieldProps) {
  return (
    <div className={cn([
      className,
      "flex flex-col", {
        ['opacity-60']: disabled
      }])}>
      {label && <label className="uppercase text-xs font-bold mb-0.5 pl-2" htmlFor={name}>{label}</label>}
      {children}
    </div>
  )
}
