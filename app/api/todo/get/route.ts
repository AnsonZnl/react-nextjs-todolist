import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ItodoItem } from "types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const todos: ItodoItem[] = await prisma?.todoList.findMany({ where: { userId: Number(userId) } });
  return Response.json(todos);
}
