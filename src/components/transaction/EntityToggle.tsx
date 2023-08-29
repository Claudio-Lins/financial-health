"use client"

import React, { useState } from "react"

export default function EntityToggle() {
  const [corporativo, setCorporativo] = useState(false)
  const [pessoal, setPessoal] = useState(true)

  function toggleIncomeExpense() {
    setCorporativo(!corporativo)
    setPessoal(!pessoal)
  }

  return (
    <div className="flex w-full mt-4 items-center border rounded-full overflow-hidden ">
      <button
        type="button"
        onClick={toggleIncomeExpense}
        className={`
            w-full px-8 py-2 transition-all duration-500 bg-white text-sm
            ${
              pessoal
                ? "font-bold bg-zinc-900 text-zinc-100"
                : "bg-zinc-100 text-zinc-500"
            }
            `}
      >
        CORPORATIVO
      </button>
      <button
        type="button"
        onClick={toggleIncomeExpense}
        className={`
            w-full px-8 py-2 transition-all duration-500 text-sm
            ${
              corporativo
                ? "font-bold bg-zinc-900 text-zinc-100"
                : "bg-zinc-100 text-zinc-500"
            }
            `}
      >
        PESSOAL
      </button>
    </div>
  )
}
