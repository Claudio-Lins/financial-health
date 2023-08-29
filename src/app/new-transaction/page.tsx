import { Sidebar } from "@/components/transaction/Sidebar"
import { TransactionForm } from "@/components/transaction/TransactionForm"
import { Button } from "@/components/ui/button"
import React from "react"
import prisma from "@/lib/prisma"
import { Category } from "@/@types"

interface NewTransactionProps {
  categories: Category[]
}

export default async function NewTransaction() {
  const categories = await prisma.category.findMany()
  const user = await prisma.user.findFirst()
  if (!user) {
    return null
  }

  return (
    <div className="w-full max-h-screen">
      <TransactionForm categories={categories} user={user} />
    </div>
  )
}
