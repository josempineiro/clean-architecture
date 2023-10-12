import { BaseField } from '@/core/presentation/components/forms/fields/base-field'
import {
  Input,
  InputProps,
} from '@/core/presentation/components/forms/fields/input'

export interface NumberFieldProps extends Omit<InputProps, 'onChange'> {
  label?: string
  value?: number
  onChange?: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void
}

export function NumberField({
  label,
  value,
  name,
  disabled,
  className,
  onChange = () => {},
  ...rest
}: NumberFieldProps) {
  return (
    <BaseField
      label={label}
      name={name}
      disabled={disabled}
      className={className}
    >
      <Input
        value={value}
        type="number"
        name={name}
        disabled={disabled}
        onChange={(event) => {
          onChange(parseInt(event.target.value, 10), event)
        }}
        {...rest}
      />
    </BaseField>
  )
}
