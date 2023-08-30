"use client"

import React, { useState } from "react"
import { Sidebar } from "./Sidebar"
import { toast } from "@/components/ui/use-toast"
import { useSidebarStpsStore } from "@/context/side-bar-steps-store"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Separator } from "../ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { InputRadio } from "./InputRadio"

import { Recurring } from "./Recurring"
import { Location } from "./Location"
import { Category, User } from "@/@types"
import { Badge } from "../ui/badge"
import { CheckboxCategory } from "../ui/checkboxCategory"
import { DatePickerDemo } from "./DatePicker"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"

const transactionFormSchema = z.object({
  amount: z.number().min(1, {
    message: "O valor mínimo é de 1€",
  }),
  name: z.string().min(1).max(20),
  type: z.enum(["INCOME", "EXPENSE"]),
  entity: z.enum(["COMPANY", "PERSON"]),
  paymentMethod: z.enum(["CASH", "CREDIT", "DEBIT"]),
  recurring: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  location: z.string(),
  notes: z.string(),
  receipt: z.string(),
  bankAccount: z.string(),
  categories: z.array(z.string()),
  userId: z.string(),
  createdAt: z.coerce.date(),
})
interface TransactioFormProps {
  categories: Category[]
  user: User
}
type TransactionFormData = z.infer<typeof transactionFormSchema>

export function TransactionForm({ categories, user }: TransactioFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: undefined,
      name: "Almoço",
      type: "EXPENSE",
      entity: "COMPANY",
      paymentMethod: "CASH",
      recurring: "DAILY",
      location: "Pingo Doce",
      notes: "Sem comentários",
      receipt: "Não",
      bankAccount: "Millenium",
      categories: [],
      userId: user.id,
      createdAt: new Date(),
    },
  })

  const createdAt = new Date()
  const portugalDate = createdAt.toLocaleDateString("pt-PT")

  async function onSubmit(values: z.infer<typeof transactionFormSchema>) {
    const response = await fetch("/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    toast({
      title: "Transação criada com sucesso",
    })
    router.push("/admin")
    form.reset()
    setStep(1)
  }

  const { setStep, step } = useSidebarStpsStore()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pt-12 md:pt-24 h-screen flex items-center "
      >
        <div className=" px-4 flex flex-col justify-between items-center w-full">
          <div className="mx-auto flex flex-1 md:flex-none md:h-[600px]  w-full max-w-sm md:max-w-[950px] flex-col items-start rounded-3xl bg-white backdrop-blur-md bg-opacity-40 p-4 shadow-md md:flex-row md:pl-4">
            <Sidebar step={step} />
            <div className="mt-4 flex px-2 md:mt-0 md:flex-1 md:justify-end md:pr-14">
              <div className="flex h-full flex-col justify-between md:w-[505px]">
                {step === 1 && (
                  <div className="">
                    <div className="flex flex-col gap-2">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-center items-center">
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                value={
                                  field.value === undefined ? "" : field.value
                                }
                                placeholder="0.00 €"
                                onChange={(event) =>
                                  field.onChange(+event.target.value)
                                }
                                className="w-1/2 h-20 bg-white backdrop-blur-md bg-opacity-40 text-3xl text-center font-bold text-emerald-600"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="createdAt"
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-center items-center">
                            <FormControl>
                              <input
                                {...field}
                                type="date"
                                value={
                                  field.value === undefined
                                    ? ""
                                    : field.value.toISOString().split("T")[0]
                                }
                                onChange={(event) =>
                                  field.onChange(
                                    new Date(event.target.value.toString())
                                  )
                                }
                                className="w-1/2 h-10 rounded-md border border-gray-300 px-2"
                              />
                            </FormControl>
                            <FormDescription>Data da transação</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator className="my-4" />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              id="name"
                              type="text"
                              placeholder="Nome da transação"
                              className="w-full h-10 rounded-md border border-gray-300 px-2"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {/* TYPE of  TRANSACTION */}
                    <div className="flex items-center justify-evenly gap-4">
                      <div className="mt-4 w-1/2 flex flex-col gap-2 p-2 border rounded-lg">
                        <h4 className="font-bold">Tipo de transação</h4>
                        <InputRadio
                          form={form}
                          registeValue={"type"}
                          value="EXPENSE"
                          label="Expense"
                        />
                        <InputRadio
                          form={form}
                          registeValue={"type"}
                          value="INCOME"
                          label="Income"
                        />
                      </div>
                      <div className="mt-4 w-1/2 flex flex-col gap-2 p-2 border rounded-lg">
                        <h4 className="font-bold">Tipo de entidade</h4>
                        <InputRadio
                          form={form}
                          registeValue={"entity"}
                          value="COMPANY"
                          label="COMPANY"
                        />
                        <InputRadio
                          form={form}
                          registeValue={"entity"}
                          value="PERSON"
                          label="PERSON"
                        />
                      </div>
                    </div>
                    {/* PAYMENT METHOD */}
                    <div className="mt-4 w-full flex flex-col gap-2 p-2 border rounded-lg">
                      <h4 className="font-bold">Metodo de pagamento</h4>
                      <div className="flex items-center justify-evenly gap-2">
                        <InputRadio
                          form={form}
                          registeValue={"paymentMethod"}
                          value="CASH"
                          label="CASH"
                        />
                        <InputRadio
                          form={form}
                          registeValue={"paymentMethod"}
                          value="CREDIT"
                          label="CREDIT"
                        />
                        <InputRadio
                          form={form}
                          registeValue={"paymentMethod"}
                          value="DEBIT"
                          label="DEBIT"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="flex flex-col space-y-2">
                    <Recurring form={form} registeValue={"recurring"} />
                    <Location form={form} />
                    <div className="flex flex-wrap w-full p-2 rounded-lg border items-center justify-center gap-4">
                      <FormField
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-center items-center">
                            <div className="mb-4">
                              <FormLabel className="text-base">
                                Categorias
                              </FormLabel>
                            </div>
                            <div className="flex flex-wrap w-full items-center gap-6 justify-evenly">
                              {categories.map((category) => (
                                <FormField
                                  key={category.id}
                                  control={form.control}
                                  name="categories"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        className="flex justify-center items-center gap-1"
                                        key={category.id}
                                      >
                                        <FormControl>
                                          <CheckboxCategory
                                            checked={field.value?.includes(
                                              category.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    category.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== category.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal leading-3 flex items-center">
                                          <Badge
                                            className="-mt-2 px-4"
                                            style={{
                                              backgroundColor: category.color,
                                              cursor: "pointer",
                                            }}
                                          >
                                            {category.name}
                                          </Badge>
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="flex flex-col gap-4">
                    <pre>
                      <code>{JSON.stringify(form.getValues(), null, 2)}</code>
                    </pre>
                  </div>
                )}
                <Separator className="my-6" />
              </div>
            </div>
          </div>
          <div className="flex mt-4 w-full items-center gap-4 justify-between px-2">
            <Button
              type="button"
              variant={step > 1 && step <= 3 ? "default" : "ghost"}
              onClick={
                step > 1 && step <= 3
                  ? () => setStep(step - 1)
                  : () => router.push("/admin")
              }
              className="w-1/2"
            >
              {step > 1 && step <= 3 ? "Voltar" : "Cancel"}
            </Button>
            <Button
              type="button"
              onClick={
                step < 3
                  ? () => {
                      setStep(step + 1)
                    }
                  : form.handleSubmit(onSubmit)
              }
              className="w-1/2"
            >
              {step === 3 ? "Salvar" : "Próximo"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
