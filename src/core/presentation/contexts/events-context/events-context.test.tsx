import React from 'react'
import { render, waitFor, renderHook } from '@testing-library/react'
import { Event } from '@/core/domain'
import {
  EventsProvider,
  useEvents,
} from '@/core/presentation/contexts/events-context' // Import your context component

interface TestEventPayload {
  message: string
}

type TestEvent = Event<TestEventPayload>

const testEventListenerSpy = jest.fn()

const Receiver = () => {
  const { listen } = useEvents()

  React.useEffect(() => {
    return listen<TestEvent>('test-event', testEventListenerSpy)
  }, [listen])

  return <div data-testid="test-component">Receiver</div>
}

const Transmitter = () => {
  const { emit } = useEvents()

  React.useEffect(() => {
    emit<TestEvent>({
      type: 'test-event',
      payload: {
        message: 'Sending message from transmitter',
      },
    })
  }, [emit])

  return <div data-testid="test-component">Transmitter</div>
}

describe('EventsContext', () => {
  describe('EventsProvider', () => {
    test('subscribes to and emits events correctly', () => {
      render(
        <EventsProvider>
          <Transmitter />
          <Receiver />
        </EventsProvider>,
      )

      waitFor(() => {
        expect(testEventListenerSpy).toBeCalledTimes(2)
        expect(testEventListenerSpy).toBeCalledWith({
          message: 'Sending message from transmitter',
        })
      })
    })
  })
  describe('useEvents', () => {
    test('throws an error when used outside EventsProvider', () => {
      try {
        renderHook(() => useEvents())
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).message).toBe(
          'useEvents must be used within an EventsProvider',
        )
      }
    })
  })
})
