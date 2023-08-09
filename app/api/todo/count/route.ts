import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(userId: number) {
  const nums = await prisma.todoList.count({
    where: { userId },
  });

  return nums;
}
