"use client"
import React from "react"
import { Form } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Separator } from "@/components/ui/separator"

import { Coins, CreditCard } from "lucide-react"
import { Category } from "@/@types"
import { User, Transaction } from "@prisma/client"

const transactionFormSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  entity: z.enum(["COMPANY", "PERSON"]),
  paymentMethod: z.enum(["CASH", "CREDIT", "DEBIT"]),
  recurring: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  name: z.string().min(1).max(20),
  amount: z.number(),
  location: z.string(),
  notes: z.string(),
  receipt: z.string(),
  bankAccount: z.string(),
  categories: z.object({
    connect: z.object({
      id: z.array(z.string()),
    }),
  }),
  userId: z.string(),
})

type TransactionFormData = z.infer<typeof transactionFormSchema>

interface EntranceFormProps {
  categories: Category[]
  user: User[]
}

// function getUserId() {
//   const response = await fetch("/api/user")
//   const data = await response.json()
//   return data.id
// }

// console.log(getUserId())

export function EntranceForm({ categories, user }: EntranceFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: "EXPENSE",
      entity: "COMPANY",
      paymentMethod: "CASH",
      name: "Gasoleo",
      amount: 10,
      location: "BP",
      notes: "Nada",
      receipt: "Nada",
      bankAccount: "Nada",
      categories: {
        connect: {
          id: categories.map((category: Category) => category.id),
        },
      },
      // userId: getUserId(),
    },
  })

  // console.log(user)

  async function onSubmit(data: any) {
    // await fetch("api/transaction", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    console.log(data)
    // reset()
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between w-full h-screen md:h-auto"
    >
      <div className="">
        <Separator className="mb-6" />
        <div className="w-full flex justify-center">
          <Input
            className="w-1/2 h-20 text-3xl text-center font-bold text-emerald-600"
            type="number"
            {...register("amount", {
              valueAsNumber: true,
            })}
          />
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="type">Tipo</Label>
              <select
                className="w-full h-10 rounded-md border border-gray-300 px-2"
                {...register("type")}
              >
                <option value="EXPENSE">Despesa</option>
                <option value="INCOME">Rendimento</option>
              </select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <Label htmlFor="entity">Entidade</Label>
              <select
                className="w-full h-10 rounded-md border border-gray-300 px-2"
                {...register("entity")}
              >
                <option value="COMPANY">Empresa</option>
                <option value="PERSON">Pessoal</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="paymentMethod">Método de pagamento</Label>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className=""
                  {...register("paymentMethod")}
                  value="CASH"
                />
                <Coins size={18} />
                <span>Dinheiro</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className=""
                  {...register("paymentMethod")}
                  value="CREDIT"
                />
                <CreditCard size={18} />
                <span>Crédito</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className=""
                  {...register("paymentMethod")}
                  value="DEBIT"
                />
                <CreditCard size={18} />
                <span>Débito</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              className="w-full h-10 rounded-md border border-gray-300 px-2"
              type="text"
              placeholder="Nome"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Localização</Label>
            <Input
              className="w-full h-10 rounded-md border border-gray-300 px-2"
              type="text"
              placeholder="Localização"
              {...register("location")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="note">Nota</Label>
            <Input
              className="w-full h-10 rounded-md border border-gray-300 px-2"
              type="text"
              placeholder="Nota"
              {...register("notes")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Categoria</Label>
            <select
              className="w-full h-10 rounded-md border border-gray-300 px-2"
              {...register("categories")}
            >
              {categories?.map((category: Category) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 w-full border-t pt-4 bg-white p-2">
        <Button type="submit" variant={"ghost"} className="w-full">
          Cancelar
        </Button>
        <Button className="w-full">Salvar</Button>
      </div>
    </form>
  )
}
