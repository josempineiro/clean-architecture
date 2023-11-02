'use client'

import { createContext, useEffect, useRef, useContext, useState } from 'react'

export interface DragAndDropContextValue<TItem> {
  draggedItem: TItem | null
  draggedOverItem: TItem | null
  isDraggable(item: TItem): boolean
  isDroppable(draggedItem: TItem, draggedOverItem: TItem): boolean
  onDragItemStart(item: TItem, event: React.DragEvent): void
  onDragItemEnter(item: TItem, event: React.DragEvent): void
  onDragItemOver(item: TItem, event: React.DragEvent): void
  onDragItemLeave(item: TItem, event: React.DragEvent): void
  onDragItemEnd(item: TItem, event: React.DragEvent): void
  onDropItem(item: TItem, event: React.DragEvent): void
  compareItems(a: TItem, b: TItem): boolean
  sortItems<T extends TItem>(items: T[]): T[]
}

export const DragAndDropContext = createContext<
  DragAndDropContextValue<any> | undefined
>(undefined)

export function useDragAndDrop<TItem>() {
  const context = useContext(DragAndDropContext)

  if (!context) {
    throw new Error(
      'useDragAndDrop must be used within a DragAndDropContextProvider',
    )
  }

  return context as DragAndDropContextValue<TItem>
}

interface DragItemAttributes {
  draggable: boolean
  onDragStart: (event: React.DragEvent) => void
  onDragEnd: (event: React.DragEvent) => void
}
export function useDragItemAttributes<TItem>(item: TItem): DragItemAttributes {
  const {
    draggedItem,
    isDraggable,
    onDragItemStart,
    onDragItemEnd,
    compareItems,
  } = useDragAndDrop<TItem>()

  return {
    draggable: isDraggable(item),
    onDragStart: (event) => {
      onDragItemStart(item, event)
    },
    onDragEnd: (event) => {
      onDragItemEnd(item, event)
    },
  }
}

export function useDropItemAttributes<TItem>(item: TItem): {
  onDragEnter: (event: React.DragEvent) => void
  onDragOver: (event: React.DragEvent) => void
  onDragLeave: (event: React.DragEvent) => void
  onDrop: (event: React.DragEvent) => void
} {
  const { onDragItemEnter, onDragItemOver, onDragItemLeave, onDropItem } =
    useDragAndDrop<TItem>()

  return {
    onDragEnter: (event: React.DragEvent) => {
      onDragItemEnter(item, event)
    },
    onDragOver: (event: React.DragEvent) => {
      onDragItemOver(item, event)
    },
    onDragLeave: (event: React.DragEvent) => {
      onDragItemLeave(item, event)
    },
    onDrop: (event: React.DragEvent) => {
      onDropItem(item, event)
    },
  }
}

export interface DragAndDropProviderProps<TItem> {
  children: React.ReactNode
  isDraggable(item: TItem): boolean
  isDroppable(draggedItem: TItem, draggedOverItem: TItem): boolean
  onDrop(draggedItem: TItem, draggedOverItem: TItem): void
  onMove?(draggedItem: TItem, draggedOverItem: TItem): void
  compareItems(a: TItem, b: TItem): boolean
}

function useEffectRef<T>(value: T): React.MutableRefObject<T> {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref
}

export function DragAndDropProvider<TItem>({
  children,
  onDrop,
  onMove,
  isDraggable,
  compareItems,
  isDroppable,
}: DragAndDropProviderProps<TItem>) {
  const [draggedItem, setDraggedItem] = useState<TItem | null>(null)
  const [draggedOverItem, setDraggedOverItem] = useState<TItem | null>(null)

  function onDragItemStart(item: TItem, event: React.DragEvent) {
    if (isDraggable(item) && !draggedItem) {
      event.stopPropagation()
      setDraggedItem(item)
      setDraggedOverItem(item)
    }
  }
  function onDragItemEnter(item: TItem, event: React.DragEvent) {
    if (draggedItem && isDroppable(draggedItem, item)) {
      event.preventDefault()
      event.stopPropagation()
      if (!draggedOverItem || !compareItems(draggedOverItem, item)) {
        setDraggedOverItem(item)
      }
    }
  }
  function onDragItemOver(item: TItem, event: React.DragEvent) {
    if (draggedItem && isDroppable(draggedItem, item)) {
      event.preventDefault()
      event.stopPropagation()
      if (!draggedOverItem || !compareItems(draggedOverItem, item)) {
        setDraggedOverItem(item)
      }
    }
  }
  function onDragItemLeave(item: TItem) {
    if (draggedItem && draggedOverItem && compareItems(draggedOverItem, item)) {
      setDraggedOverItem(null)
    }
  }
  function onDragItemEnd(item: TItem, event: React.DragEvent) {
    if (draggedItem) {
      setDraggedItem(null)
      setDraggedOverItem(null)
      event.stopPropagation()
    }
  }
  function onDropItem(item: TItem, event: React.DragEvent) {
    if (draggedItem && draggedOverItem) {
      setDraggedItem(null)
      setDraggedOverItem(null)
      if (isDroppable(draggedItem, item)) {
        event.preventDefault()
        onDrop(draggedItem, draggedOverItem)
      }
    }
  }

  const onMoveRef = useEffectRef(onMove)

  useEffect(() => {
    if (draggedItem && draggedOverItem && onMoveRef.current) {
      onMoveRef.current(draggedItem, draggedOverItem)
    }
  }, [onMoveRef, draggedItem, draggedOverItem])

  function sortItems<T extends TItem>(items: T[]): T[] {
    if (!draggedItem || !draggedOverItem) {
      return items
    }
    const draggedItemChild =
      draggedItem && items.find((item) => compareItems(item, draggedItem))
    const draggedOverItemSibbling =
      draggedOverItem &&
      items.find((item) => compareItems(item, draggedOverItem))
    if (draggedItemChild) {
      const draggedItemChildIndex = items.indexOf(draggedItemChild)
      const itemsWithoutDraggedItem = [
        ...items.slice(0, draggedItemChildIndex),
        ...items.slice(draggedItemChildIndex + 1),
      ]
      if (draggedOverItemSibbling) {
        if (draggedItemChild === draggedOverItemSibbling) {
          return items
        }
        const draggedOverItemSibblingIndex = items.indexOf(
          draggedOverItemSibbling,
        )
        return [
          ...itemsWithoutDraggedItem.slice(0, draggedOverItemSibblingIndex),
          draggedItem as T,
          ...itemsWithoutDraggedItem.slice(draggedOverItemSibblingIndex),
        ]
      } else {
        return [...itemsWithoutDraggedItem, draggedItem as T]
      }
    } else if (draggedOverItemSibbling) {
      return [
        ...items.slice(0, items.indexOf(draggedOverItemSibbling)),
        draggedItem as T,
        ...items.slice(items.indexOf(draggedOverItemSibbling)),
      ]
    } else {
      return items
    }
  }
  return (
    <DragAndDropContext.Provider
      value={{
        draggedItem,
        draggedOverItem,
        isDraggable,
        isDroppable,
        onDragItemStart,
        onDragItemEnter,
        onDragItemOver,
        onDragItemLeave,
        onDragItemEnd,
        onDropItem,
        compareItems,
        sortItems,
      }}
    >
      {children}
      {draggedItem && (
        <pre>
          <code>
            {JSON.stringify(
              {
                draggedItem: draggedItem.id,
                ...(draggedOverItem && {
                  draggedOverItem: draggedOverItem.id,
                }),
              },
              null,
              2,
            )}
          </code>
        </pre>
      )}
    </DragAndDropContext.Provider>
  )
}
