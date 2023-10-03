'use client'
import React, { useState } from "react";

export interface FormValues {
  [key: string]: any
}

export interface FormProps<TFormValues extends FormValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onChange' | 'onSubmit'> {
  values: TFormValues
  onChange: (values: TFormValues, event: React.ChangeEvent<HTMLFormElement>) => void
  onSubmit: (values: TFormValues, event: React.FormEvent) => void
}

export interface FormProviderProps<TFormValues extends FormValues> extends FormProps<TFormValues> {
  children: React.ReactNode
}

export interface FormContextValue<TFormValues extends FormValues> {
  values: TFormValues
  onChange: (values: TFormValues, event: React.ChangeEvent<HTMLFormElement>) => void
  onSubmit: (values: TFormValues, event: React.FormEvent) => void,
  setFieldValue: <FieldValue>(field: string, value: FieldValue, event: React.ChangeEvent<HTMLFormElement>) => void,
  getFieldValue: <FieldValue>(field: string) => FieldValue,
}

export const FormContext = React.createContext<FormContextValue<any> | undefined>(undefined)
 
export function useForm<TFormValues extends FormValues>(): FormContextValue<TFormValues> {
  const context = React.useContext(FormContext)
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider')
  }
  return context as FormContextValue<TFormValues>
}

export function Form<TFormValues extends FormValues>({
  values,
  onChange,
  onSubmit,
  children,
  ...rest
}: FormProps<TFormValues>) {
  const [formValues, setTFormValues] = useState<TFormValues>(values)
  function setFieldValue<FieldValue>(field: string, value: FieldValue, event: React.ChangeEvent<HTMLFormElement>) {
    const newFormValues = {
      ...formValues,
      [field]: value,
    }
    setTFormValues(newFormValues)
    onChange(newFormValues, event)
  }
  function getFieldValue<FieldValue>(field: string): FieldValue {
    return formValues[field] as FieldValue
  }
  function submit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit(formValues, event)
  }

  return (
    <FormContext.Provider value={{
      values: formValues,
      onChange,
      setFieldValue,
      getFieldValue,
      onSubmit,
    }}>
      <form onSubmit={submit} {...rest}>
        {children}
      </form>
    </FormContext.Provider>
  )
}