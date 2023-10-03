

export interface CheckboxOption<OptionValue> {
  label: string
  value: OptionValue
  disabled?: boolean
}

export interface CheckboxesFieldProps<OptionValue extends string | number> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string
  value?: Record<OptionValue, boolean>
  onChange?: (value: Record<OptionValue, boolean>, event: React.ChangeEvent<HTMLInputElement>) => void
  options: CheckboxOption<OptionValue>[]
}

export function CheckboxesField({
  label,
  value,
  onChange = () => {},
  options,
  ...rest
}: CheckboxesFieldProps<string>) {
  const handleChangeOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      [event.target.value]: event.target.checked
    }, event)
  }
  return (
    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {options.map((option, index) => {
        const optionValue = option.value
        const checked = value && value[optionValue]
        return(
          <li key={index} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                  <input {...rest} type="checkbox" value={option.value} checked={checked} onChange={handleChangeOption} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="vue-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-wrap">{option.label}</label>
              </div>
          </li>
        )
      })}
    </ul>
  )
}