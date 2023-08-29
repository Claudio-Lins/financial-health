"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useModalEntranceStore } from "@/context/modal-entrance-store"
import { EntranceForm } from "../form/EntranceForm"
import { Category } from "@/@types"
import { User } from "@prisma/client"

interface ModalLoginProps {
  title: string
  description?: string
  categories: Category[]
  user: User[]
}

export function ModalEntrace({
  title,
  description,
  categories,
  user,
}: ModalLoginProps) {
  const { setShowModalEntrance, showModalEntrance } = useModalEntranceStore()

  return (
    <Dialog
      open={showModalEntrance}
      onOpenChange={() => setShowModalEntrance(false)}
    >
      <DialogContent className="flex flex-col w-full max-w-lg h-screen md:h-auto">
        <DialogHeader onClick={() => setShowModalEntrance(false)}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <EntranceForm categories={categories} user={user} />
      </DialogContent>
    </Dialog>
  )
}
