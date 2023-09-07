'use client'

import { cn } from '@/lib/utils'
import { CheckCircle, ArrowUpCircleIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { useSelectedDateStore } from '@/context/selescted-date-store'
import { useEffect, useState } from 'react'
import { $Enums, Transaction } from '@prisma/client'
import { formatteCurrency } from '@/uteis/formatter'

interface SummaryCardDayProps {
  // totalAmount: string
  dailyGoal: number
  transactionToday: Transaction[]
  transaction: Transaction[]
}

export function SummaryCardDay({
  dailyGoal,
  transactionToday,
  transaction,
}: SummaryCardDayProps) {
  const { daySelected, monthSelected } = useSelectedDateStore()
  const [todayIncome, setTodayIncome] = useState(0)
  const [todayExpense, setTodayExpense] = useState(0)

  const selectedDate = dayjs().format('DD')

  // console.log(transaction[0].createdAt.toLocaleDateString().slice(0, 2))

  useEffect(() => {
    const todayIncome = transaction
      .filter((transaction) => {
        return (
          transaction.createdAt.toLocaleDateString().slice(0, 2) === daySelected
        )
      })
      .filter((transaction) => transaction.type === 'INCOME')
      .reduce((acc, transaction) => {
        return acc + transaction.amount
      }, 0)

    const todayExpense = transaction
      .filter((transaction) => {
        return (
          transaction.createdAt.toLocaleDateString().slice(0, 2) === daySelected
        )
      })
      .filter((transaction) => transaction.type === 'EXPENSE')
      .reduce((acc, transaction) => {
        return acc + transaction.amount
      }, 0)

    setTodayExpense(todayExpense)
    setTodayIncome(todayIncome)
  }, [daySelected, transaction])

  const todalDaily = todayIncome - todayExpense

  return (
    <div className="bg-zinc-50 w-[100px] h-24 rounded-lg shadow-sm p-2 flex flex-col justify-between">
      <div className="flex items-center justify-between w-full">
        <span className="text-xs font-light">
          {daySelected ? (
            <>
              <span>
                {daySelected}/{monthSelected}
              </span>
            </>
          ) : (
            'today'
          )}
        </span>
        {dailyGoal < todalDaily ? (
          <CheckCircle className={cn('w-4 h-4 text-green-600')} />
        ) : (
          <ArrowUpCircleIcon className={cn('w-4 h-4 text-red-600')} />
        )}
      </div>
      <div className="flex flex-1 items-end justify-between w-full">
        <span className="text-sm font-bold">
          {formatteCurrency(todalDaily)}
        </span>
        <div
          className={cn(
            'w-[2.5px] mr-[6px] rounded-md h-14',
            dailyGoal < todalDaily ? 'bg-green-600' : 'bg-red-600'
          )}
        />
      </div>
    </div>
  )
}
