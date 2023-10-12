import { BaseField } from '@/core/presentation/components/forms/fields/base-field'
import { Select } from '@/core/presentation/components/forms/fields/select'
export interface SelectOption<OptionValue> {
  label: string
  value: OptionValue
  disabled?: boolean
}

export interface SelectFieldProps<OptionValue>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value?: string
  label?: React.ReactNode
  onChange?: (
    value: OptionValue | undefined,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void
  options: SelectOption<OptionValue>[]
}
export function SelectField({
  label,
  value,
  onChange = () => {},
  name,
  options,
  disabled,
  className,
  ...rest
}: SelectFieldProps<string>) {
  return (
    <BaseField
      name={name}
      label={label}
      disabled={disabled}
      className={className}
    >
      <Select
        name={name}
        value={value}
        options={options}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
    </BaseField>
  )
}
