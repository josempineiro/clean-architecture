
import React from 'react'
import { useForm } from '@/core/presentation/components/forms/form'

export function Field<TField>({
  field,
  label,
  children,
}: {
  field: string
  label: string
  children: React.ReactElement
}) {
  const form = useForm()
  return React.cloneElement(children, {
    label,
    name: field,
    value: form.getFieldValue<TField>(field),
    onChange: (value: TField, event: React.ChangeEvent<HTMLFormElement>) => {
      form.setFieldValue<TField>(field, value, event)
    }
  })
}

export default Field