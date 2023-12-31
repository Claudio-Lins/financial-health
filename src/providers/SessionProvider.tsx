"use client";

import "@/lib/dayjs";
import { SessionProvider } from "next-auth/react";

interface ProviderPros {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderPros) {
  return <SessionProvider>{children}</SessionProvider>;
}
