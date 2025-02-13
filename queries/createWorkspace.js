"use server"
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";


const createWorkspace = async (messages) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const result = await prisma.workspace.create({
            data: {
                messages,
                userId,
            }
        });
        return result;
    } catch (error) {
        console.error("Error creating workspace:", error);
        throw new Error("Failed to create workspace");
    }
};

export default createWorkspace;