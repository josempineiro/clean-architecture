import { Button } from '@/core/presentation'

export interface DefaultErrorProps {
  error: Error
  onRetry: () => void
}

export function DefaultError({
  error,
  onRetry,
}: {
  error: Error
  onRetry: () => void
}) {
  return (
    <div className="w-full h-full flex">
      <div>Something was wrong!</div>
      {error.message && <p>{error.message}</p>}
      <Button onClick={onRetry}>Retry</Button>
    </div>
  )
}
