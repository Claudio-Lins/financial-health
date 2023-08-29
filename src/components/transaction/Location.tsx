import { FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export interface LocationProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  form: any
}

export function Location({ form }: LocationProps) {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem className="flex flex-col justify-center items-center">
            <FormLabel>Local</FormLabel>
            <Input {...field} />
          </FormItem>
        )}
      />
    </div>
  )
}
