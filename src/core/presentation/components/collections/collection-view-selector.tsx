import cn from 'classnames'

import {
  CollectionView,
} from '@/ecommerce/presentation'

interface CollectionViewOption {
  name: CollectionView
  label: React.ReactNode
}

function CollectionViewIcon({ view }: { view: CollectionView }) {
  if (view === 'grid') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-current w-4 h-4"
      >
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    )
  }
  if (view === 'list') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-current w-4 h-4"
      >
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
    )
  }
}

function useViewOptions(): Array<CollectionViewOption> {
  return [
    {
      name: 'grid',
      label: 'Grid',
    },
    {
      name: 'list',
      label: 'List',
    },
  ]
}

export function CollectionViewSelector({
  value = 'grid',
  onChange = function () {},
}: {
  value?: CollectionView
  onChange?: (value: CollectionView) => void
}) {
  const viewOptions = useViewOptions()
  return (
    <div className="bg-gray-900 text-sm text-gray-500 leading-none border-2 border-gray-900 rounded-full inline-flex">
      {viewOptions.map((viewOption, index) => (
        <button
          key={viewOption.name}
          onClick={() => onChange(viewOption.name)}
          className={cn([
            'text-white inline-flex items-center bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700',
            {
              'bg-gray-500 dark:bg-gray-500': value === viewOption.name,
              'rounded-l-full': index === 0,
              'rounded-r-full': index === viewOptions.length - 1,
            },
          ])}
          id="grid"
        >
          <CollectionViewIcon view={viewOption.name} />
        </button>
      ))}
    </div>
  )
}
