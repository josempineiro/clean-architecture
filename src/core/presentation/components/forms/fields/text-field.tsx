import {
  InputField,
  InputFieldProps,
} from '@/core/presentation/components/forms/fields/input-field'

export interface TextFieldProps extends Omit<InputFieldProps, 'onChange'> {
  label?: string
  value?: string
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

export function TextField({
  label,
  value,
  onChange = () => {},
  ...rest
}: TextFieldProps) {
  return (
    <InputField
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, event)
      }}
      {...rest}
    />
  )
}
