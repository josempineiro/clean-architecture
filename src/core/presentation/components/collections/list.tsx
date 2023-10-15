import cn from 'classnames'

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode
  divide?: boolean
  direction?: 'horizontal' | 'vertical'
}
export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
}

export function ListItem({
  children,
  className,
}: ListItemProps) {
  return <li className={cn([className])}>{children}</li>
}

export function List({
  children,
  divide,
  className,
  direction = 'vertical',
}: ListProps) {
  return (
    <ul
      className={cn([
        className,
        'w-full flex',
        {
          'flex-col': direction === 'vertical',
          'flex-row': direction === 'horizontal',
          'divide-y divide-gray-200 dark:divide-gray-100': divide,
        },
      ])}
    >
      {children}
    </ul>
  )
}
