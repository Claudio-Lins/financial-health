"use client"
import Image from "next/image"
import { Step } from "./Step"

interface SidebarProps {
  step: number
}

export function Sidebar({ step }: SidebarProps) {
  return (
    <div className="flex w-full flex-col justify-between rounded-2xl bg-black p-4 md:h-[570px] md:w-[275px] md:px-8 md:py-9">
      <div className="flex justify-evenly gap-8 md:flex-col">
        <Step
          currentStep={step === 1 ? true : false}
          step={1}
          title="Informações pessoais"
        />
        <Step
          currentStep={step === 2 ? true : false}
          step={2}
          title="Escolha os produtos"
        />
        <Step currentStep={step === 3 ? true : false} step={3} title="Resumo" />
      </div>
      <div className="hidden justify-center md:flex">
        {/* <Image
          src="/logo/lg-site-neg.svg"
          alt="Logo"
          width={123 * 0.8}
          height={110}
          priority
          className="border-[1px] border-white p-2"
        /> */}
      </div>
    </div>
  )
}
