

export interface RadioGroupOption<OptionValue> {
  label: string
  value: OptionValue
  disabled?: boolean
}

export interface RadioGroupFieldProps<OptionValue extends string | number> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string
  value?: OptionValue
  onChange?: (value: OptionValue, event: React.ChangeEvent<HTMLInputElement>) => void
  options: RadioGroupOption<OptionValue>[]
}

export function RadioGroupField({
  label,
  value,
  onChange = () => {},
  options,
  ...rest
}: RadioGroupFieldProps<string>) {
  const handleChangeOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, event)
  }
  return (
    <ul className="items-center w-full text-sm gap-3 px-3 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {options.map((option) => {
        const checked = Boolean(value && value === option.value)
        return(
          <li key={option.value} className="w-full border-b sm:border-r pr-3 last:pr-0 last:border-none border-gray-200 dark:border-gray-600">
              <div className="flex items-center">
                  <input  {...rest} id={option.value} type="radio" value={option.value} checked={checked} onChange={handleChangeOption} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor={option.value} className="w-full py-1.5 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{option.label}</label>
              </div>
          </li>
        )
      })}
    </ul>
  )
}