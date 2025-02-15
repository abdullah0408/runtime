"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getAllWorkspaces = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const workspaces = await prisma.workspace.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        messages: true,
      },
    });
    return workspaces;
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
};
