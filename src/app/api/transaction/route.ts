import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import dayjs from "dayjs"

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

  try {
    const transaction = await prisma.transaction.create({
      data: {
        ...body,
        categories: {
          connect: body.categories.map((id: number) => ({ id })),
        },
      },
    })
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.log(error)
  }
}
