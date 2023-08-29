import { CurrentWeek } from "@/components/CurrentWeek"
import { DayCard } from "@/components/DayCard"
import { Footer } from "@/components/Footer"
import { SummaryCard } from "@/components/SummaryCard"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import React from "react"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  const categories = await prisma.category.findMany()
  const user = await prisma.user.findMany()

  if (!session?.user) {
    return (
      <div>
        <h1>Please, login to see the admin page</h1>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center gap-2 md:gap-6 h-screen">
      <CurrentWeek />
      <div className="flex w-full items-center justify-between md:justify-evenly gap-2 mt-2">
        <SummaryCard label="Today" totalAmount={150} dailyGoal={160} />
        <SummaryCard label="Week" totalAmount={800} dailyGoal={801} />
        <SummaryCard label="Month" totalAmount={3000} dailyGoal={160} />
      </div>
      <Footer categories={categories} user={user} />
    </div>
  )
}
