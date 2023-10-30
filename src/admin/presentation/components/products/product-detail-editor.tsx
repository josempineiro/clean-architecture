'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import { Form, IconButton, EditIcon, CrossIcon } from '@/core/presentation'
import { Product } from '@/ecommerce/domain'
import { UpdateProductVariables } from '@/ecommerce/application'
import { useUpdateProduct } from '@/admin/presentation/hooks/use-update-product'

export interface ProductDetailProps {
  product: Product
}

function EditableText({
  loading,
  value,
  onChange,
  className,
}: {
  loading?: boolean
  value: string
  onChange: (value: string) => void
  className: string
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const rootRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleClickOutside = useRef<() => void>()

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = useCallback(() => {
    setIsEditing(false)
    if (localValue !== value) {
      onChange(localValue)
    }
  }, [localValue, onChange, value])

  useEffect(() => {
    handleClickOutside.current = handleSave
  }, [handleSave])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
      if (textRef.current) {
        inputRef.current.style.width = `${textRef.current.offsetWidth}px`
      }
    }
  }, [isEditing])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (textRef.current && inputRef.current) {
      inputRef.current.style.width = `${textRef.current.offsetWidth}px`
    }
  }, [localValue])

  useEffect(() => {
    if (isEditing) {
      const handleClickOutsideFn = (event: MouseEvent) => {
        if (
          handleClickOutside.current &&
          rootRef.current &&
          !rootRef.current.contains(event.target as Node)
        ) {
          handleClickOutside.current()
        }
      }
      document.addEventListener('click', handleClickOutsideFn)
      return () => {
        document.removeEventListener('click', handleClickOutsideFn)
      }
    }
  }, [isEditing])

  const handleCancel = () => {
    setIsEditing(false)
    setLocalValue(value)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    event.key === 'Enter' && handleSave()
    event.key === 'Escape' && handleCancel()
    event.key === 'Tab' && handleSave()
  }

  return (
    <div className={cn(['inline-flex flex-row group relative'])} ref={rootRef}>
      {isEditing ? (
        <>
          <span
            className={cn([className, 'absolute opacity-0 z-0'])}
            ref={textRef}
          >
            {localValue}
          </span>
          <input
            type="text"
            ref={inputRef}
            style={{
              boxShadow: 'none',
            }}
            className={cn([
              className,
              'z-0 bg-transparent border-none focus:border-none shadow-none focus:shadow-none p-0',
            ])}
            value={localValue}
            onChange={(event) => setLocalValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconButton
            onClick={handleCancel}
            tabIndex={-1}
            className={cn([
              'absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2',
            ])}
          >
            <CrossIcon className="h-4 w-4" />
          </IconButton>
        </>
      ) : (
        <>
          <span
            className={cn([className])}
            onClick={handleEdit}
            tabIndex={1}
            onFocus={handleEdit}
          >
            {value}
          </span>
          <IconButton
            loading={loading}
            onClick={handleEdit}
            className={cn([
              'absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2',
              {
                ['inline-flex']: loading,
                ['group-hover:inline-flex hidden']: !loading,
              },
            ])}
          >
            <EditIcon className="h-4 w-4" />
          </IconButton>
        </>
      )}
    </div>
  )
}

export function ProductDetailEditor({ product }: ProductDetailProps) {
  const [updateProduct, { loading }] = useUpdateProduct({
    onError: (error) => {
      console.log(error)
    },
  })
  return (
    <div className="w-full items-start flex flex-col gap-4">
      <EditableText
        value={product.name}
        loading={loading}
        onChange={(name) =>
          updateProduct({
            id: product.id,
            name,
          })
        }
        className="whitespace-pre text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
      />
      <EditableText
        value={product.description}
        loading={loading}
        onChange={(description) =>
          updateProduct({
            id: product.id,
            description,
          })
        }
        className="whitespace-pre text-base font-semibold tracking-tight text-gray-900 dark:text-white"
      />
    </div>
  )
}
