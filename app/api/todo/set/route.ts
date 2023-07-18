import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { content } = await req.json();
  const session = await getServerSession();

  debugger;
  const user = await prisma.todoList.create({
    data: { content, userId: 1 },
  });
  return NextResponse.json(user);
}
