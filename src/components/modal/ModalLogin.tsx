"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useContext, useEffect } from "react";
import { ModalContext } from "./modal-context";
import { SignInForm } from "../form/SignInForm";
import { useSession } from "next-auth/react";

interface ModalLoginProps {
  title: string;
  description?: string;
}

export function ModalLogin({ title, description }: ModalLoginProps) {
  const { data: session } = useSession();
  const { setShowModal, showModal } = useContext(ModalContext);

  useEffect(() => {
    if (session) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [session, setShowModal]);

  return (
    <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
      <DialogContent>
        <DialogHeader onClick={() => setShowModal(false)}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}
