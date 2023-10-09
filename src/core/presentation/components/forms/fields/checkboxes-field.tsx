export interface CheckboxOption<OptionValue> {
  label: string
  value: OptionValue
  disabled?: boolean
}

export interface CheckboxesFieldProps<OptionValue extends string | number>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
  > {
  label?: string
  value?: Record<OptionValue, boolean>
  onChange?: (
    value: Record<OptionValue, boolean>,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
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
    onChange(
      {
        ...value,
        [event.target.value]: event.target.checked,
      },
      event,
    )
  }
  return (
    <ul className="items-center w-full text-sm font-medium gap-3 px-3 text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {options.map((option) => {
        const optionValue = option.value
        const checked = Boolean(value && value[optionValue])
        return (
          <li
            key={option.value}
            className="w-full pr-3 last:pr-0 last:border-none border-gray-200 dark:border-gray-600 whitespace-pre"
          >
            <div className="flex items-center gap-2">
              <input
                {...rest}
                id={option.value}
                type="checkbox"
                value={option.value}
                checked={checked}
                onChange={handleChangeOption}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor={option.value}
                className="w-full py-1.5 text-sm font-medium text-gray-900 dark:text-gray-300 text-wrap"
              >
                {option.label}
              </label>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
