import Link from "next/link";
import { buttonVariants } from "./ui/button";

import { Euro, HandMetal } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UseAccountNav } from "./UseAccountNav";
import prisma from "@/lib/prisma";

export async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst();

  // console.log(user);
  return (
    <div className=" bg-zinc-100 backdrop-blur-md bg-opacity-40 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Euro />
        </Link>
        {session?.user ? (
          <>
            <UseAccountNav user={user?.avatarUrl} />
          </>
        ) : (
          <Link className={buttonVariants()} href="/sign-in">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}
