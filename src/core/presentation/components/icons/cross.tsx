import cn from 'classnames'

export interface CrossIconProps extends React.SVGAttributes<SVGElement> {}

export function CrossIcon({ className, ...props }: CrossIconProps) {
  return (
    <svg
      className={cn([className, 'fill-current dark:fill-current'])}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >

<path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
    </svg>
  )
}
