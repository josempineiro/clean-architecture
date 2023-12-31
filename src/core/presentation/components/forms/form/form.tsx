'use client'
import _ from 'lodash'
import React, { useState } from 'react'

export interface FormValues {
  [key: string]: any
}

export interface FormProps<TFormValues extends FormValues>
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onChange' | 'onSubmit'
  > {
  values: TFormValues
  disabled?: boolean
  onChange?: (
    values: TFormValues,
    event: React.ChangeEvent<HTMLElement>,
  ) => void
  onSubmit: (values: TFormValues, event: React.FormEvent) => void
}

export interface FormProviderProps<TFormValues extends FormValues>
  extends FormProps<TFormValues> {
  children: React.ReactNode
}

export interface FormContextValue<TFormValues extends FormValues> {
  values: TFormValues
  disabled?: boolean
  onChange: (values: TFormValues, event: React.ChangeEvent<HTMLElement>) => void
  onSubmit: (values: TFormValues, event: React.FormEvent) => void
  setFieldValue: <FieldValue>(
    field: string,
    value: FieldValue,
    event: React.ChangeEvent<HTMLElement>,
  ) => void
  getFieldValue: <FieldValue>(field: string) => FieldValue
}

export const FormContext = React.createContext<
  FormContextValue<any> | undefined
>(undefined)

export function useForm<
  TFormValues extends FormValues,
>(): FormContextValue<TFormValues> {
  const context = React.useContext(FormContext)
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider')
  }
  return context as FormContextValue<TFormValues>
}

export function Form<TFormValues extends FormValues>({
  values,
  onChange = _.noop,
  onSubmit,
  children,
  disabled,
  ...rest
}: FormProps<TFormValues>) {
  const [formValues, setTFormValues] = useState<TFormValues>(values)
  function setFieldValue<FieldValue>(
    field: string,
    value: FieldValue,
    event: React.ChangeEvent<HTMLElement>,
  ) {
    const newFormValue = _.set({ ...formValues }, field, value) as TFormValues
    setTFormValues(newFormValue)
    onChange(newFormValue, event)
  }
  function getFieldValue<FieldValue>(field: string): FieldValue {
    return _.get(formValues, field) as FieldValue
  }
  function submit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit(formValues, event)
  }

  return (
    <FormContext.Provider
      value={{
        values: formValues,
        onChange,
        setFieldValue,
        getFieldValue,
        onSubmit,
        disabled,
      }}
    >
      <form onSubmit={submit} {...rest}>
        {children}
      </form>
    </FormContext.Provider>
  )
}
