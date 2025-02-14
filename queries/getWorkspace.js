"use server";

import { prisma } from "@/lib/db";

export const getWorkspace = async (workspaceId) => {
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
