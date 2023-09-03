"use client"

import { useSelectedDateStore } from "@/context/selescted-date-store"

export function SelectedDay() {
  const { daySelected, setDaySelected } = useSelectedDateStore()
  return <div>{+daySelected}</div>
}
