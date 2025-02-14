"use server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const updateWorkspace = async (workspaceId, messages) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const result = await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        messages,
      },
    });
    return result;
  } catch (error) {
    console.error("Error updating workspace:", error);
    throw new Error("Failed to update workspace");
  }
};

export default updateWorkspace;
