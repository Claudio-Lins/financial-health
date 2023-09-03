"use client"
import { useModalEntranceStore } from "@/context/modal-entrance-store"
import { Fuel, LogOut, PlusCircle, User2, Wallet } from "lucide-react"
import React from "react"
import { ModalEntrace } from "./modal/ModalEntrace"
import { Category } from "@/@types"
import { User } from "@prisma/client"
import Link from "next/link"

interface FooterProps {}

export function Footer() {
  return (
    <div className="fixed bottom-0 bg-white backdrop-blur w-full h-14 rounded-b-xl flex items-center p-2 justify-center">
      <div className="flex items-center justify-evenly px-2 gap-2 w-full max-w-md">
        <button className=" rounded-full flex items-center justify-center p-2 ">
          <Fuel className="w-6 h-6 font-medium " />
        </button>
        <button className=" rounded-full flex items-center justify-center p-2 ">
          <User2 className="w-6 h-6 font-medium " />
        </button>
        <Link
          href="/new-transaction"
          className=" rounded-full flex items-center shadow-md bg-white justify-center p-2 -mt-10"
        >
          <PlusCircle className="w-12 h-12 font-medium " />
        </Link>
        <button className=" rounded-full flex items-center justify-center p-2 ">
          <Wallet className="w-6 h-6 font-medium " />
        </button>
        <button className=" rounded-full flex items-center justify-center p-2 ">
          <LogOut className="w-6 h-6 font-medium " />
        </button>
      </div>
    </div>
  )
}
