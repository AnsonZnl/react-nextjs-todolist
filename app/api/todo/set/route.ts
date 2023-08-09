import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { GET as getCount } from "../count/route";

export async function POST(req: Request) {
  const { content, userId } = await req.json();
  const nums = await getCount(userId);
  if (nums > 6) {
    return NextResponse.json({ code: -100, msg: "The number of todos exceeds five" });
  }
  const todo = await prisma.todoList.create({
    data: { content, userId },
  });

  return NextResponse.json(todo);
}
