import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog"
import { PlusCircle } from "lucide-react"
import React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const categoryFormSchema = z.object({
  name: z.string(),
})
type CategoryFormValuesType = z.infer<typeof categoryFormSchema>

export function FormCategory() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValuesType>({
    resolver: zodResolver(categoryFormSchema),
  })

  return (
    <Dialog>
      <DialogTrigger>
        <PlusCircle />
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data)
            reset()
          })}
        >
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Nome da categoria"
              {...register("name")}
            />
            {errors.name && <span>{errors.name.message}</span>}
            <Separator />
            <div className="flex justify-between">
              <Button type="submit" className="w-full">
                Criar
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
