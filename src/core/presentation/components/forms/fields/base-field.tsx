import React from 'react'
import { useForm } from '@/core/presentation/components/forms/form'

export function BaseField<TField>({
  field,
  label,
  children,
}: {
  field: string
  label: string
  children: React.ReactElement
}) {
  const form = useForm()
  return (
    <div className="flex flex-col">
      <label htmlFor={field}>{label}</label>
      {React.cloneElement(children, {
        label,
        id: field,
        name: field,
        value: form.getFieldValue<TField>(field),
        onChange: (
          value: TField,
          event: React.ChangeEvent<HTMLFormElement>,
        ) => {
          form.setFieldValue<TField>(field, value, event)
        },
      })}
    </div>
  )
}
