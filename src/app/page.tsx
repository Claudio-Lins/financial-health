import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-xs mx-auto w-full mt-10 items-center">
      <div className="flex flex-col items-center justify-center" gap-2>
        <h1>Faça login</h1>
        <Link className={buttonVariants()} href="/sign-in">
          Sign in
        </Link>
      </div>
    </main>
  );
}
