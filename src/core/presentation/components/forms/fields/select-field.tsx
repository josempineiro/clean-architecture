

export interface SelectOption<OptionValue> {
  label: string
  value: OptionValue
  disabled?: boolean
}

export interface SelectFieldProps<OptionValue> extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string
  value?: string
  onChange?: (value: OptionValue | undefined, event: React.ChangeEvent<HTMLSelectElement>) => void
  options: SelectOption<OptionValue>[]
}
export function SelectField({
  label,
  value,
  onChange = () => {},
  options,
  ...rest
}: SelectFieldProps<string>) {
  return (
    <select {...rest} defaultValue={value} onChange={(event) => onChange(event.target.value, event)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      {options.map((option) => <option key={option.label} value={option.value}>{option.label}</option>)}
    </select>
  )
}