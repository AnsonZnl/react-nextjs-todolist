import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const todos = await prisma?.todoList.delete({ where: { id: Number(id) } });
  return NextResponse.json(todos);
}
