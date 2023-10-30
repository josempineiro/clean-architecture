import cn from 'classnames'

export interface ChevronProps extends React.SVGAttributes<SVGElement> {
  direction: 'up' | 'down' | 'left' | 'right'
}

export function ChevronIcon({ direction, className, ...props }: ChevronProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn([className])}
      viewBox={['down', 'up'].includes(direction) ? '0 0 14 8' : '0 0 8 14'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {direction === 'down' && (
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
        />
      )}
      {direction === 'up' && (
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
        />
      )}
      {direction === 'left' && (
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
        />
      )}
      {direction === 'right' && (
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
        />
      )}
    </svg>
  )
}
