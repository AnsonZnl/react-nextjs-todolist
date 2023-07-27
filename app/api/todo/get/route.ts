import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const todos = await prisma?.todoList.findMany({ where: { userId: Number(userId) } });
  return NextResponse.json(todos);
}
