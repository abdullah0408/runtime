"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getWorkspace = async (workspaceId) => {

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  
  if (!workspaceId) return null;

  try {
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
    });
    return workspace;
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
};
