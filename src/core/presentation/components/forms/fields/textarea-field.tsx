import {
  Textarea,
  TextareaProps,
} from '@/core/presentation/components/forms/fields/textarea'
import { BaseField } from '@/core/presentation/components/forms/fields/base-field'

export interface TextareaFieldProps extends Omit<TextareaProps, 'onChange'> {
  label?: string
  value?: string
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void
}

export function TextareaField({
  label,
  value,
  onChange = () => {},
  name,
  disabled,
  className,
  ...rest
}: TextareaFieldProps) {
  return (
    <BaseField
      name={name}
      label={label}
      disabled={disabled}
      className={className}
    >
      <Textarea
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
