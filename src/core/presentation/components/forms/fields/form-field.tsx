import React from 'react'
import { useForm } from '@/core/presentation/components/forms/form'

export interface FormFieldProps<TValue> {
  id: string
  name: string
  value: TValue
  onChange: (value: any, event: React.ChangeEvent<HTMLElement>) => void
}

export function FormField<TValue>({
  field,
  children,
}: {
  field: string
  children:
    | React.ReactElement
    | ((
        props: FormFieldProps<TValue>,
        form: ReturnType<typeof useForm>,
      ) => React.ReactElement)
}) {
  const form = useForm()
  const fieldProps = {
    id: field,
    name: field,
    value: form.getFieldValue<TValue>(field),
    disabled: form.disabled,
    onChange: (value: TValue, event: React.ChangeEvent<HTMLElement>) => {
      form.setFieldValue<TValue>(field, value, event)
    },
  }
  return (
    <>
      {children && typeof children === 'function'
        ? children(fieldProps, form)
        : React.cloneElement(children, fieldProps)}
    </>
  )
}
