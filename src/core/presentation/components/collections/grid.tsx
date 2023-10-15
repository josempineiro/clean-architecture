import React from 'react'
import cn from 'classnames'

export type GridGapXY = {
  x: number
  y: number
}

export type GridGap = GridGapXY | number

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  gap?: GridGap | Record<Breakpoint, GridGap>
  cols?: number | Record<Breakpoint, number>
}

const classnames = [
  'grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12',
  'gap-0 gap-1 gap-2 gap-3 gap-4 gap-5 gap-6 gap-7 gap-8 gap-9 gap-10 gap-11 gap-12',
  'gap-x-0 gap-x-1 gap-x-2 gap-x-3 gap-x-4 gap-x-5 gap-x-6 gap-x-7 gap-x-8 gap-x-9 gap-x-10 gap-x-11 gap-x-12',
  'gap-y-0 gap-y-1 gap-y-2 gap-y-3 gap-y-4 gap-y-5 gap-y-6 gap-y-7 gap-y-8 gap-y-9 gap-y-10 gap-y-11 gap-y-12',
  'xs:grid-cols-1 xs:grid-cols-2 xs:grid-cols-3 xs:grid-cols-4 xs:grid-cols-5 xs:grid-cols-6 xs:grid-cols-7 xs:grid-cols-8 xs:grid-cols-9 xs:grid-cols-10 xs:grid-cols-11 xs:grid-cols-12',
  'sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-6 sm:grid-cols-7 sm:grid-cols-8 sm:grid-cols-9 sm:grid-cols-10 sm:grid-cols-11 sm:grid-cols-12',
  'md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6 md:grid-cols-7 md:grid-cols-8 md:grid-cols-9 md:grid-cols-10 md:grid-cols-11 md:grid-cols-12',
  'lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6 lg:grid-cols-7 lg:grid-cols-8 lg:grid-cols-9 lg:grid-cols-10 lg:grid-cols-11 lg:grid-cols-12',
  'xl:grid-cols-1 xl:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6 xl:grid-cols-7 xl:grid-cols-8 xl:grid-cols-9 xl:grid-cols-10 xl:grid-cols-11 xl:grid-cols-12',
  'xs:gap-0 xs:gap-1 xs:gap-2 xs:gap-3 xs:gap-4 xs:gap-5 xs:gap-6 xs:gap-7 xs:gap-8 xs:gap-9 xs:gap-10 xs:gap-11 xs:gap-12',
  'sm:gap-0 sm:gap-1 sm:gap-2 sm:gap-3 sm:gap-4 sm:gap-5 sm:gap-6 sm:gap-7 sm:gap-8 sm:gap-9 sm:gap-10 sm:gap-11 sm:gap-12',
  'md:gap-0 md:gap-1 md:gap-2 md:gap-3 md:gap-4 md:gap-5 md:gap-6 md:gap-7 md:gap-8 md:gap-9 md:gap-10 md:gap-11 md:gap-12',
  'lg:gap-0 lg:gap-1 lg:gap-2 lg:gap-3 lg:gap-4 lg:gap-5 lg:gap-6 lg:gap-7 lg:gap-8 lg:gap-9 lg:gap-10 lg:gap-11 lg:gap-12',
  'xl:gap-0 xl:gap-1 xl:gap-2 xl:gap-3 xl:gap-4 xl:gap-5 xl:gap-6 xl:gap-7 xl:gap-8 xl:gap-9 xl:gap-10 xl:gap-11 xl:gap-12',
  'xs:gap-x-0 xs:gap-x-1 xs:gap-x-2 xs:gap-x-3 xs:gap-x-4 xs:gap-x-5 xs:gap-x-6 xs:gap-x-7 xs:gap-x-8 xs:gap-x-9 xs:gap-x-10 xs:gap-x-11 xs:gap-x-12',
  'sm:gap-x-0 sm:gap-x-1 sm:gap-x-2 sm:gap-x-3 sm:gap-x-4 sm:gap-x-5 sm:gap-x-6 sm:gap-x-7 sm:gap-x-8 sm:gap-x-9 sm:gap-x-10 sm:gap-x-11 sm:gap-x-12',
  'md:gap-x-0 md:gap-x-1 md:gap-x-2 md:gap-x-3 md:gap-x-4 md:gap-x-5 md:gap-x-6 md:gap-x-7 md:gap-x-8 md:gap-x-9 md:gap-x-10 md:gap-x-11 md:gap-x-12',
  'lg:gap-x-0 lg:gap-x-1 lg:gap-x-2 lg:gap-x-3 lg:gap-x-4 lg:gap-x-5 lg:gap-x-6 lg:gap-x-7 lg:gap-x-8 lg:gap-x-9 lg:gap-x-10 lg:gap-x-11 lg:gap-x-12',
  'xl:gap-x-0 xl:gap-x-1 xl:gap-x-2 xl:gap-x-3 xl:gap-x-4 xl:gap-x-5 xl:gap-x-6 xl:gap-x-7 xl:gap-x-8 xl:gap-x-9 xl:gap-x-10 xl:gap-x-11 xl:gap-x-12',
  'xs:gap-y-0 xs:gap-y-1 xs:gap-y-2 xs:gap-y-3 xs:gap-y-4 xs:gap-y-5 xs:gap-y-6 xs:gap-y-7 xs:gap-y-8 xs:gap-y-9 xs:gap-y-10 xs:gap-y-11 xs:gap-y-12',
  'sm:gap-y-0 sm:gap-y-1 sm:gap-y-2 sm:gap-y-3 sm:gap-y-4 sm:gap-y-5 sm:gap-y-6 sm:gap-y-7 sm:gap-y-8 sm:gap-y-9 sm:gap-y-10 sm:gap-y-11 sm:gap-y-12',
  'md:gap-y-0 md:gap-y-1 md:gap-y-2 md:gap-y-3 md:gap-y-4 md:gap-y-5 md:gap-y-6 md:gap-y-7 md:gap-y-8 md:gap-y-9 md:gap-y-10 md:gap-y-11 md:gap-y-12',
  'lg:gap-y-0 lg:gap-y-1 lg:gap-y-2 lg:gap-y-3 lg:gap-y-4 lg:gap-y-5 lg:gap-y-6 lg:gap-y-7 lg:gap-y-8 lg:gap-y-9 lg:gap-y-10 lg:gap-y-11 lg:gap-y-12',
  'xl:gap-y-0 xl:gap-y-1 xl:gap-y-2 xl:gap-y-3 xl:gap-y-4 xl:gap-y-5 xl:gap-y-6 xl:gap-y-7 xl:gap-y-8 xl:gap-y-9 xl:gap-y-10 xl:gap-y-11 xl:gap-y-12',
]

const isGridGapXY = (gap: any): gap is GridGapXY => {
  return Boolean(typeof gap === 'object')
}

function getGridColsClassNames(cols?: number | Record<Breakpoint, number>) {
  if (typeof cols === 'number') {
    return [`grid-cols-${cols}`]
  }
  if (typeof cols === 'object') {
    return Object.entries(cols).map(([breakpoint, cols]) => {
      return `${breakpoint}:grid-cols-${cols}`
    })
  }
  return []
}

function getGapClassNames(gap?: GridGap | Record<Breakpoint, GridGap>) {
  if (typeof gap === 'number') {
    return [`gap-x-${gap} gap-y-${gap}`]
  }
  if (typeof gap === 'object') {
    if (isGridGapXY(gap)) {
      return [`gap-x-${gap.x} gap-y-${gap.y}`]
    }
    return Object.entries(gap).flatMap(([breakpoint, gap]) => {
      if (typeof gap === 'number') {
        return [`${breakpoint}:gap-${gap}`]
      }
      if (typeof gap === 'object') {
        if (isGridGapXY(gap)) {
          return [`${breakpoint}:gap-x-${gap.x} ${breakpoint}:gap-y-${gap.y}`]
        }
        return []
      }
    })
  }
  return []
}

export function Grid({ children, gap, cols, className }: GridProps) {
  return (
    <div
      className={cn([
        className,
        'grid',
        ...getGridColsClassNames(cols),
        ...getGapClassNames(gap),
      ])}
    >
      {children}
    </div>
  )
}
