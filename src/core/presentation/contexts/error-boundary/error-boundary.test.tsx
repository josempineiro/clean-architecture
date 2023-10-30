import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorBoundary } from '@/core/presentation/contexts/error-boundary'
import { DefaultErrorProps } from '@/core/presentation/components/errors/default-error'

const CustomErrorComponent = ({ error, onRetry }: DefaultErrorProps) => (
  <div>
    <h2>Custom Error Component</h2>
    <p>{error.message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
)

const reloadSpy = jest.fn()

describe('ErrorBoundary', () => {
  const original = window.location

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadSpy },
    })
  })

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: original,
    })
  })
  it('should render children if no error occurs', () => {
    render(
      <ErrorBoundary renderError={CustomErrorComponent}>
        <div>Content inside ErrorBoundary</div>
      </ErrorBoundary>,
    )

    expect(screen.getByText('Content inside ErrorBoundary')).toBeInTheDocument()
  })

  it('should render error UI and call onRetry when an error occurs', () => {
    const ErrorComponent = () => {
      throw new Error('Test Error')
    }

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Something was wrong!')).toBeInTheDocument()
    expect(screen.getByText('Test Error')).toBeInTheDocument()

    // Retry button should exist
    const retryButton = screen.getByText('Retry')
    expect(retryButton).toBeInTheDocument()

    // Simulate user clicking retry
    fireEvent.click(retryButton)

    // Ensure onRetry function was called
    expect(reloadSpy).toHaveBeenCalled()
  })
})
