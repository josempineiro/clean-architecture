'use client'

import { createContext, useContext, useRef } from 'react'
import { Event } from '@/core/domain/entities'

type EventRemover = () => void

type EventEmitter = <T extends Event>(event: T) => void

type EventCallback<T extends Event> = (payload: T['payload']) => EventRemover

type EventListener = <T extends Event>(
  type: string,
  callback: EventCallback<T>,
) => void

interface EventsContextValue {
  listen: EventListener
  emit: EventEmitter
}

export function useEvents(): EventsContextValue {
  const context = useContext(EventsContext)

  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider')
  }

  return context
}

const EventsContext = createContext<EventsContextValue | undefined>(undefined)

interface EventsProviderProps {
  children: React.ReactNode
}

export function EventsProvider({ children }: EventsProviderProps) {
  const eventListeners = useRef<Record<string, Set<EventCallback<any>>>>({})
  const listen = useRef<EventListener>(function listen<T extends Event>(
    type: string,
    callback: EventCallback<T>,
  ) {
    const eventListenersByType = eventListeners.current[type] ?? new Set()
    eventListenersByType.add(callback)
    eventListeners.current[type] = eventListenersByType
    return () => {
      eventListenersByType.delete(callback)
    }
  }).current
  const emit = useRef<EventEmitter>(function emit<T extends Event>(event: T) {
    const eventListenersByType = eventListeners.current[event.type]
    if (eventListenersByType) {
      eventListenersByType.forEach((callback) => callback(event.payload))
    }
  }).current

  return (
    <EventsContext.Provider
      value={{
        listen,
        emit,
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}
