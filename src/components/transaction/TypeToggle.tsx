"use client"

import React, { useState } from "react"

export default function TypeToggle() {
  const [expense, setExpense] = useState(true)
  const [income, setIncome] = useState(false)

  function toggleCorporativoPessoal() {
    setExpense(!expense)
    setIncome(!income)
  }

  return (
    <div className="flex w-full mt-4 items-center border rounded-full overflow-hidden ">
      <button
        type="button"
        onClick={toggleCorporativoPessoal}
        className={`
            w-full px-8 py-2 transition-all duration-500 bg-white text-sm uppercase
            ${
              income
                ? "font-bold bg-zinc-900 text-zinc-100"
                : "bg-zinc-100 text-zinc-500"
            }
            `}
      >
        Rendimento
      </button>
      <button
        type="button"
        onClick={toggleCorporativoPessoal}
        className={`
            w-full px-8 py-2 transition-all duration-500 text-sm uppercase
            ${
              expense
                ? "font-bold bg-zinc-900 text-zinc-100"
                : "bg-zinc-100 text-zinc-500"
            }
            `}
      >
        Despesa
      </button>
    </div>
  )
}
