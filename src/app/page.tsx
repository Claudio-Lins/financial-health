import { ModalLogin } from "@/components/modal/ModalLogin";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="max-w-xs mx-auto w-full mt-10 items-center">
      <ModalLogin
        title={"Faça login"}
        description={"Faça login para acessar o painel de administração."}
      />

      <div className="flex flex-col items-center justify-center" gap-2>
        <Link className={buttonVariants()} href="/admin">
          Dashboard
        </Link>
      </div>
    </main>
  );
}
