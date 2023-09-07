import { CurrentWeek } from '@/components/CurrentWeek'
import { SummaryCard } from '@/components/SummaryCard'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import dayjs from 'dayjs'
import { formatDate, formatteCurrency } from '@/uteis/formatter'
import { SummaryCardWeek } from '@/components/SummaryCardWeek'
import { SummaryCardDay } from '@/components/SummaryCardDay'
import { SummaryCardMonth } from '@/components/SummaryCardMonth'

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

  const transaction = await prisma.transaction.findMany({
    include: {
      categories: true,
    },
  })

  const transactionToday = await prisma?.transaction.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf('day').toDate(),
        lte: dayjs().endOf('day').toDate(),
      },
    },
  })
  const transactionWeek = await prisma?.transaction.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf('week').toDate(),
        lte: dayjs().endOf('week').toDate(),
      },
    },
  })

  const transactionMonth = await prisma?.transaction.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf('month').toDate(),
        lte: dayjs().endOf('month').toDate(),
      },
    },
  })

  const totalAmount = {
    todayIncome: transactionToday
      .filter((transaction) => transaction.type === 'INCOME')
      .reduce((acc, curr) => acc + curr.amount, 0),
    todayExpense: transactionToday
      .filter((transaction) => transaction.type === 'EXPENSE')
      .reduce((acc, curr) => acc + curr.amount, 0),
    weekIncome: transactionWeek
      .filter((transaction) => transaction.type === 'INCOME')
      .reduce((acc, curr) => acc + curr.amount, 0),
    weekExpense: transactionWeek
      .filter((transaction) => transaction.type === 'EXPENSE')
      .reduce((acc, curr) => acc + curr.amount, 0),
    monthIncome: transactionMonth
      .filter((transaction) => transaction.type === 'INCOME')
      .reduce((acc, curr) => acc + curr.amount, 0),
    monthExpense: transactionMonth
      .filter((transaction) => transaction.type === 'EXPENSE')
      .reduce((acc, curr) => acc + curr.amount, 0),
  }

  function currency(amount: number) {
    return new Intl.NumberFormat('en-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount)
  }

  return (
    <div className="flex flex-col items-center gap-2 md:gap-6 h-screen">
      <CurrentWeek />
      <div className="flex w-full items-center justify-evenly gap-2 mt-2">
        <SummaryCardDay
          transactionToday={transactionToday}
          transaction={transaction}
          dailyGoal={160}
        />
        <SummaryCardWeek
          totalAmount={currency(
            totalAmount.weekIncome - totalAmount.weekExpense
          )}
          dailyGoal={'801'}
        />
        <SummaryCardMonth
          // label="Month"
          totalAmount={currency(
            totalAmount.monthIncome - totalAmount.monthExpense
          )}
          dailyGoal={'160'}
        />
      </div>
      <div className="">
        {transaction.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b my-2"
            >
              {item.categories.map((category) => {
                return <span key={category.id}>{category.name}</span>
              })}
              <span>{item.type}</span>
              <span>{formatteCurrency(item.amount)}</span>
              <span>{formatDate(item.createdAt)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
