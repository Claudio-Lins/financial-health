"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UseAccountNavProps {
  user: any;
}

export function UseAccountNav({ user }: UseAccountNavProps) {
  return (
    <div>
      <button
        className="flex flex-col items-center"
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`,
          })
        }
      >
        <Avatar>
          <AvatarImage src={user} />
          <AvatarFallback>CL</AvatarFallback>
        </Avatar>
        <small className="text-xs">Sair</small>
      </button>
    </div>
  );
}
