import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { content, userId } = await req.json();
  const todo = await prisma.todoList.create({
    data: { content, userId },
  });

  return NextResponse.json(todo);
}
