"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export function SignOutBtn() {
  return <LogOut onClick={() => signOut()} className="w-6 h-6 font-medium " />
}
