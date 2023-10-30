import {
  MediaQueriesProvider,
  MediaQueriesContext,
  useMediaQuery,
} from '@/core/presentation/contexts/media-queries-context/media-queries-context'

export const MediaQueryItem = ({ breakpoint }: { breakpoint: string }) => {
  const matches = useMediaQuery(breakpoint)
  return <div>{matches ? 'true' : 'false'}</div>
}

export const MediaQueriesPlayground = () => {
  return (
    <MediaQueriesProvider>
      <MediaQueriesContext.Consumer>
        {(mediaQueries) => (
          <div>
            <code>{JSON.stringify(mediaQueries)}</code>
            <MediaQueryItem breakpoint="xs" />
          </div>
        )}
      </MediaQueriesContext.Consumer>
    </MediaQueriesProvider>
  )
}
