import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  const categories = await prisma.category.findMany()

  return NextResponse.json(categories)
}

export async function POST(request: NextRequest) {
  const { name } = await request.json()

  const category = await prisma.category.create({
    data: {
      name,
    },
  })

  return NextResponse.json(category, { status: 201 })
}
