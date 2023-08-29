import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Transaction } from "@prisma/client"

export async function GET(req: Request) {
  const transactions = await prisma.transaction.findMany({
    include: {
      categories: true,
    },
  })

  return NextResponse.json(transactions)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const transaction = await prisma.transaction.create({
    data: {
      ...body,
      categories: {
        connect: body.categories.map((id: number) => ({ id })),
      },
    },
  })
  console.log("aqui")

  return NextResponse.json(transaction, { status: 201 })
}
