import { FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export interface RecurringProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  form: any
  registeValue: string
}

export function Recurring({ form }: RecurringProps) {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="recurring"
        render={({ field }) => (
          <FormItem className="flex flex-col justify-center items-center">
            <FormLabel>Frequência</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="DAILY">Diariamente</SelectItem>
                <SelectItem value="WEEKLY">Semanalmente</SelectItem>
                <SelectItem value="MONTHLY">Mensalmente</SelectItem>
                <SelectItem value="YEARLY">Anualmente</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  )
}
