import React from "react"

export interface InputRadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  form: any
  registeValue: string
  value: string
  label: string
}

export function InputRadio(
  { form, registeValue, value, label }: InputRadioProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="flex space-x-2 item-center">
      <input
        ref={ref}
        type="radio"
        className="aspect-square h-5 w-5 rounded-xl border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...form.register(registeValue, {
          required: true,
        })}
        value={value}
      />
      <p>{label}</p>
    </div>
  )
}
