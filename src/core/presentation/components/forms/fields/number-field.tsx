import { InputField, InputFieldProps } from '@/core/presentation/components/forms/fields/input-field'

export interface NumberFieldProps extends Omit<InputFieldProps, 'onChange'> {
  label?: string
  value?: number
  onChange?: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void
}

export function NumberField({
  label,
  value,
  onChange = () => {},
  ...rest
}: NumberFieldProps) {
  return (
    <InputField
      value={value}
      type="number"
      onChange={(event) => {
        onChange(parseInt(event.target.value, 10), event)
      }}
      {...rest}
    />
  )
}