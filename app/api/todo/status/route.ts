import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, status } = await req.json();
  const todo = await prisma.todoList.update({
    where: { id },
    data: { complete: status },
  });

  return NextResponse.json(todo);
}
