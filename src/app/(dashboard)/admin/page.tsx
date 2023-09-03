import { CurrentWeek } from "@/components/CurrentWeek"
import { SummaryCard } from "@/components/SummaryCard"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import dayjs from "dayjs"
import { SelectedDay } from "@/components/SelectedDate"
import { SummaryCardWeek } from "@/components/SummaryCardWeek"
import { SummaryCardDay } from "@/components/SummaryCardDay"

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

  const transaction = await prisma.transaction.findMany()

  const transactionToday = await prisma?.transaction.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf("day").toDate(),
        lte: dayjs().endOf("day").toDate(),
      },
    },
  })
  const transactionWeek = await prisma?.transaction.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf("week").toDate(),
        lte: dayjs().endOf("week").toDate(),
      },
    },
  })

  const transactionMonth = await prisma?.transaction.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf("month").toDate(),
        lte: dayjs().endOf("month").toDate(),
      },
    },
  })

  const totalAmount = {
    todayIncome: transactionToday
      .filter((transaction) => transaction.type === "INCOME")
      .reduce((acc, curr) => acc + curr.amount, 0),
    todayExpense: transactionToday
      .filter((transaction) => transaction.type === "EXPENSE")
      .reduce((acc, curr) => acc + curr.amount, 0),
    weekIncome: transactionWeek
      .filter((transaction) => transaction.type === "INCOME")
      .reduce((acc, curr) => acc + curr.amount, 0),
    weekExpense: transactionWeek
      .filter((transaction) => transaction.type === "EXPENSE")
      .reduce((acc, curr) => acc + curr.amount, 0),
    monthIncome: transactionMonth
      .filter((transaction) => transaction.type === "INCOME")
      .reduce((acc, curr) => acc + curr.amount, 0),
    monthExpense: transactionMonth
      .filter((transaction) => transaction.type === "EXPENSE")
      .reduce((acc, curr) => acc + curr.amount, 0),
  }

  function currency(amount: number) {
    return new Intl.NumberFormat("en-PT", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  return (
    <div className="flex flex-col items-center gap-2 md:gap-6 h-screen">
      <CurrentWeek />
      <div className="flex w-full items-center justify-evenly gap-2 mt-2">
        <SummaryCardDay
          transactionToday={transactionToday}
          transaction={transaction}
          // totalAmount={currency(
          //   totalAmount.todayIncome - totalAmount.todayExpense
          // )}
          dailyGoal={160}
        />
        <SummaryCardWeek
          totalAmount={currency(
            totalAmount.weekIncome - totalAmount.weekExpense
          )}
          dailyGoal={"801"}
        />
        <SummaryCard
          label="Month"
          totalAmount={currency(
            totalAmount.monthIncome - totalAmount.monthExpense
          )}
          dailyGoal={"160"}
        />
      </div>
      <SelectedDay />
      <pre>
        <code>
          {JSON.stringify(transactionMonth[0].createdAt, null, 2).slice(9, 11)}
        </code>
      </pre>
    </div>
  )
}
