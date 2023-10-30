'use client'

import React, { Component } from 'react'
import {
  DefaultError,
  DefaultErrorProps,
} from '@/core/presentation/components/errors/default-error'

interface ErrorBoundaryProps {
  children: React.ReactNode
  renderError?: typeof DefaultError
}

interface ErrorBoundaryState {
  errors: Array<Error>
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor({
    children,
    renderError = (props: DefaultErrorProps) => <DefaultError {...props} />,
  }: ErrorBoundaryProps) {
    super({
      children,
      renderError,
    })
    this.state = { errors: [] }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(errorInfo)
    this.setState({ errors: [...this.state.errors, error] })
  }

  render() {
    const { renderError = DefaultError } = this.props
    if (this.state.errors.length > 0) {
      return (
        <div role="alert" className="w-full h-full flex-1">
          {renderError({
            error: this.state.errors[0],
            onRetry: () => window.location.reload(),
          })}
        </div>
      )
    }

    return this.props.children
  }
}
