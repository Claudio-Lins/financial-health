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
import { useRouter } from "next/navigation"
import { Category, User } from "@/@types"
import { MinusCircle, PlusCircle } from "lucide-react"
import { FormCategory } from "./FormCategory"

const transactionFormSchema = z.object({
  amount: z.number(),
  name: z.string(),
  type: z.enum(["INCOME", "EXPENSE"]),
  // entity: z.enum(["COMPANY", "PERSON"]),
  // paymentMethod: z.enum(["CASH", "CREDIT", "DEBIT"]),
  // recurring: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  // location: z.string(),
  // notes: z.string(),
  // receipt: z.string(),
  // bankAccount: z.string(),
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
  const [formCategory, setFormCategory] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: undefined,
      name: "",
      type: "EXPENSE",
      userId: user.id,
      createdAt: new Date(),
    },
  })

  // const form = useForm<z.infer<typeof transactionFormSchema>>({
  // resolver: zodResolver(transactionFormSchema),
  //   defaultValues: {
  //     amount: undefined,
  //     name: "",
  //     type: "EXPENSE",
  //     entity: "COMPANY",
  //     paymentMethod: "CASH",
  //     recurring: "DAILY",
  //     location: "Pingo Doce",
  //     notes: "Sem comentários",
  //     receipt: "Não",
  //     bankAccount: "Millenium",
  //     categories: [],
  //     userId: user.id,
  //     createdAt: new Date(),
  //   },
  // })

  const createdAt = new Date()
  const portugalDate = createdAt.toLocaleDateString("pt-PT")

  async function onSubmit(data: any) {
    const response = await fetch("/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    toast({
      title: "Transação criada com sucesso",
    })
    router.push("/admin")
    router.refresh()
    reset()
  }

  async function createCategory() {
    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      })
      toast({
        title: "Categoria criada com sucesso",
      })
      router.refresh()
      setFormCategory(false)
      setCategoryName("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" flex flex-col gap-4 w-full p-4">
      <h2 className="font-bold text-2xl text-center">Entrada de Tansações</h2>
      <Separator className="" />
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data)
        })}
        className="flex flex-col flex-1 justify-between gap-4"
      >
        <div className="flex flex-col gap-4 bg-white backdrop-blur-sm bg-opacity-60 flex-1 rounded-lg shadow-sm  p-2">
          <div className="flex w-full justify-center mt-4">
            <input
              className="w-1/2 h-20 text-center text-2xl font-bold rounded-lg"
              placeholder="€ 0,00"
              type="number"
              {...register("amount", {
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="flex w-full justify-center">
            <input
              type="date"
              className="w-full h-10 rounded-lg"
              {...register("createdAt", {
                valueAsDate: true,
              })}
            />
          </div>
          <div className="flex w-full justify-center">
            <Input
              className="w-full"
              placeholder="Nome da Transação"
              type="text"
              {...register("name")}
            />
          </div>
          <div className="flex w-full justify-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="expense"
                value="EXPENSE"
                {...register("type")}
              />
              <label htmlFor="expense">Despesa</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="income"
                value="INCOME"
                {...register("type")}
              />
              <label htmlFor="income">Receita</label>
            </div>
          </div>
          <div className="p-4  border rounded-lg">
            <div className="w-full flex flex-wrap gap-3 justify-evenly">
              <span className="block text-center w-full font-bold text-xl">
                Categoria
              </span>
              {categories.map((categoty) => {
                return (
                  <div
                    key={categoty.id}
                    className="flex items-center gap-1 border justify-between px-2 py-1 rounded-lg shadow-sm "
                  >
                    <input
                      className="w-5 h-5 rounded-md"
                      type="checkbox"
                      id={categoty.name}
                      value={categoty.id}
                      {...register("categories")}
                    />
                    <label htmlFor={categoty.name}>{categoty.name}</label>
                  </div>
                )
              })}
              <div className="flex flex-col">
                <Button
                  onClick={() => setFormCategory(!formCategory)}
                  variant={"ghost"}
                >
                  {formCategory ? <MinusCircle /> : <PlusCircle />}
                </Button>
              </div>
            </div>
            {formCategory && (
              <div className="mt-4">
                <div className="flex flex-col gap-2">
                  <Input
                    type="text"
                    placeholder="Nome da categoria"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  <Separator />
                  <div className="flex justify-between">
                    <button
                      onClick={createCategory}
                      type="button"
                      className="w-full"
                    >
                      Criar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between space-x-4">
          <Button
            className="w-1/2 text-white hover:text-zinc-600"
            type="button"
            variant="ghost"
            onClick={() => router.push("/admin")}
          >
            Cancelar
          </Button>
          <Button className="w-1/2" type="submit">
            Criar
          </Button>
        </div>
      </form>
    </div>
  )
}
