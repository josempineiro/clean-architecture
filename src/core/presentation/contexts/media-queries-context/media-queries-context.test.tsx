import { renderHook } from '@testing-library/react'
import {
  defaultBreakpoints,
  useMediaQuery,
  MediaQueriesProvider,
  useMediaQueries,
  defaultMediaQueries,
} from '@/core/presentation/contexts/media-queries-context/media-queries-context'

function parseMediaQuery(query: string): { min: number; max: number } {
  const minMaxValues = query.match(/(\d+)/g)
  if (minMaxValues && minMaxValues.length === 2) {
    const min = parseInt(minMaxValues[0], 10)
    const max = parseInt(minMaxValues[1], 10)
    return { min, max }
  } else if (minMaxValues && minMaxValues.length === 1) {
    if (query.includes('min')) {
      const min = parseInt(minMaxValues[0], 10)
      return { min, max: Infinity }
    }
    if (query.includes('max')) {
      const max = parseInt(minMaxValues[0], 10)
      return { min: 0, max }
    }
  }
  return {
    min: 0,
    max: Infinity,
  }
}

function matchMediaQuery(query: string, width: number): boolean {
  const { min, max } = parseMediaQuery(query)
  const matched = min <= width && max >= width
  return matched
}

function mockMatchMedia(size: number) {
  return (query: string) => ({
    matches: matchMediaQuery(query, size),
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })
}

const customMediaQueries = {
  small: '(max-width: 100px)',
  medium: '(min-width: 101px) and (max-width: 200px)',
  large: '(min-width: 201px)',
}

const CustomMediaQueriesProvider = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <MediaQueriesProvider queries={customMediaQueries}>
    {children}
  </MediaQueriesProvider>
)

const renderHookWithCustomMediaQueries = (hook: () => any) =>
  renderHook(hook, {
    wrapper: CustomMediaQueriesProvider,
  })

describe('MediaQueries', () => {
  describe('Provider', () => {
    describe('by default', () => {
      describe('useMediaQueries', () => {
        it('should return default media queries', () => {
          const { result } = renderHook(() => useMediaQueries(), {
            wrapper: ({ children }) => (
              <MediaQueriesProvider>{children}</MediaQueriesProvider>
            ),
          })
          expect(result.current).toBe(defaultMediaQueries)
        })
      })
      describe('useMediaQuery', () => {
        describe.each(Object.entries(defaultBreakpoints))(
          'when screen is %s',
          (breakpoint, minWidth) => {
            describe('and media match', () => {
              beforeEach(() => {
                Object.defineProperty(window, 'matchMedia', {
                  writable: true,
                  value: mockMatchMedia(minWidth),
                })
              })
              it('should return true', () => {
                const { result } = renderHook(() => useMediaQuery(breakpoint), {
                  wrapper: ({ children }) => (
                    <MediaQueriesProvider>{children}</MediaQueriesProvider>
                  ),
                })

                expect(result.current).toBe(true)
              })
            })
            describe("and media doesn't match", () => {
              beforeEach(() => {
                Object.defineProperty(window, 'matchMedia', {
                  writable: true,
                  value: mockMatchMedia(minWidth - 1),
                })
              })
              it('should return true', () => {
                const { result } = renderHook(() => useMediaQuery(breakpoint))
                expect(result.current).toBe(false)
              })
            })
          },
        )
      })
    })
    describe('when custom queries', () => {
      describe('useMediaQueries', () => {
        const { result } = renderHookWithCustomMediaQueries(() =>
          useMediaQueries(),
        )
        it('should return custom media queries', () => {
          expect(result.current).toBe(customMediaQueries)
        })
      })
      describe('useMediaQuery', () => {
        describe.each(Object.entries(customMediaQueries))(
          'when screen is %s',
          (breakpoint, mediaQuery) => {
            let result: any
            const { min, max } = parseMediaQuery(mediaQuery)
            describe('and media match', () => {
              beforeEach(() => {
                Object.defineProperty(window, 'matchMedia', {
                  writable: true,
                  value: mockMatchMedia(min),
                })
                result = renderHookWithCustomMediaQueries(() =>
                  useMediaQuery(breakpoint),
                ).result
              })
              it('should return true', () => {
                expect(result.current).toBe(true)
              })
            })
            describe("and media doesn't match", () => {
              beforeEach(() => {
                Object.defineProperty(window, 'matchMedia', {
                  writable: true,
                  value: mockMatchMedia(min - 1),
                })
                result = renderHookWithCustomMediaQueries(() =>
                  useMediaQuery(breakpoint),
                ).result
              })
              it('should return false', () => {
                expect(result.current).toBe(false)
              })
            })
          },
        )
      })
    })
  })
})
