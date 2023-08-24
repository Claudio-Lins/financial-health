import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function layout({ children }: AuthLayoutProps) {
  return <div className=" p-2 rounded-md">{children}</div>;
}
