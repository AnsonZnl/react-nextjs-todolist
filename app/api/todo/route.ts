import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ItodoItem } from "types";

// 查询todo
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const todos: ItodoItem[] = await prisma?.todoList.findMany({ where: { userId: Number(userId) } });
  return Response.json(todos);
}

// 添加todo
export async function POST(req: Request) {
  const { content, userId } = await req.json();
  const nums = await prisma.todoList.count({
    where: { userId },
  });
  if (nums > 4) {
    return NextResponse.json({ code: -100, msg: "The number of todos exceeds five" });
  }
  const todo = await prisma.todoList.create({
    data: { content, userId },
  });

  return NextResponse.json(todo);
}

// 删除todo
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const todos = await prisma?.todoList.delete({ where: { id: Number(id) } });
  return NextResponse.json(todos);
}

// 修改todo
export async function PUT(req: Request) {
  const { id, complete } = await req.json();
  const todo = await prisma.todoList.update({
    where: { id },
    data: { complete },
  });

  return NextResponse.json(todo);
}
