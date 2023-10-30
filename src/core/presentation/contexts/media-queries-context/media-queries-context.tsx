'use client'

import { createContext, useState, useEffect, useContext } from 'react'

export const defaultBreakpoints: Record<string, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

export const generateMediaQueries = (breakpoints: Record<string, number>) =>
  Object.entries(breakpoints).reduce(
    (mediaQueriesByBreakpoint, [breakpoint, width], index, breakpoints) => ({
      ...mediaQueriesByBreakpoint,
      [breakpoint]: `(min-width: ${width}px)${
        index < breakpoints.length - 1
          ? ` and (max-width: ${breakpoints[index + 1][1] - 1}px)`
          : ''
      }`,
    }),
    {},
  )

export type MediaQueries = Record<string, string>

export const defaultMediaQueries = generateMediaQueries(defaultBreakpoints)

export const MediaQueriesContext =
  createContext<MediaQueries>(defaultMediaQueries)

export function useMediaQueries() {
  return useContext(MediaQueriesContext)
}

export function useMediaQuery(breakpoint: string): boolean {
  const mediaQueries = useMediaQueries()
  const query = mediaQueries[breakpoint]
  if (!query) {
    throw new Error(`Invalid breakpoint: ${breakpoint}`)
  }
  const [matches, setMatches] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQueryList.addEventListener('change', handleMediaQueryChange)
    // @ts-ignore
    handleMediaQueryChange(mediaQueryList)

    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange)
    }
  }, [query])

  return matches
}

export function MediaQueriesProvider({
  queries = defaultMediaQueries,
  children,
}: {
  queries?: MediaQueries
  children: React.ReactNode
}) {
  return (
    <MediaQueriesContext.Provider value={queries}>
      {children}
    </MediaQueriesContext.Provider>
  )
}
