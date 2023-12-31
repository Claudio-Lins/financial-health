import { Navbar } from "@/components/Navbar"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { Provider } from "@/providers/SessionProvider"
import { Footer } from "@/components/Footer"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const user = await prisma.user.findFirst()
  return (
    <html lang="pt">
      <body
        className={`${inter.className} bg-[url('/bg/bg-rainbow.jpg')] bg-cover bg-center bg-no-repeat`}
      >
        <Provider>
          <main className=" ">
            <Toaster />
            {/* <Navbar /> */}
            <div className="w-full min-h-screen py-4">{children}</div>
            <Footer session={session} />
          </main>
        </Provider>
      </body>
    </html>
  )
}
