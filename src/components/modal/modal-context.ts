"use client";

import { createContext } from "react";

interface ContextModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const ModalContext = createContext<ContextModalProps>({
  showModal: false,
  setShowModal: () => {},
});
