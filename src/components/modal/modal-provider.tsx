"use client";
import { ModalContext } from "./modal-context";
import { ModalLogin } from "./ModalLogin";
import { useState } from "react";
import { Provider } from "../../providers/SessionProvider";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(true);
  return (
    <ModalContext.Provider value={{ setShowModal, showModal }}>
      {children}
    </ModalContext.Provider>
  );
}
