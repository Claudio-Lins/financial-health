"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function UseAccountNav() {
  return (
    <div>
      <Button
        variant={"destructive"}
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`,
          })
        }
      >
        SingOut
      </Button>
    </div>
  );
}
