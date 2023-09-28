export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
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
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        className="bg-transparent border-b border-gray-500 focus:border-b focus:border-teal-500 outline-none"
        value={value}
        onChange={(event) => {
          onChange(event.target.value, event)
        }}
        {...rest}
      />
    </div>
  )
}