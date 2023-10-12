import {
  Input,
  InputProps,
} from '@/core/presentation/components/forms/fields/input'
import { BaseField } from '@/core/presentation/components/forms/fields/base-field'

export interface TextFieldProps extends Omit<InputProps, 'onChange'> {
  label?: string
  value?: string
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

export function TextField({
  label,
  value,
  onChange = () => {},
  name,
  disabled,
  className,
  ...rest
}: TextFieldProps) {
  return (
    <BaseField
      name={name}
      label={label}
      disabled={disabled}
      className={className}
    >
      <Input
        value={value}
        disabled={disabled}
        name={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value, event)
        }}
        {...rest}
      />
    </BaseField>
  )
}
