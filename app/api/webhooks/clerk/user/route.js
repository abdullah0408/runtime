import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function POST(req) {
  const CLERK_USER_WEBHOOK_SIGNING_SECRET =
    process.env.CLERK_USER_WEBHOOK_SIGNING_SECRET;

  if (!CLERK_USER_WEBHOOK_SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const wh = new Webhook(CLERK_USER_WEBHOOK_SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { data } = evt;
    if (!data.id) {
      return new Response("Error: Missing user ID", {
        status: 400,
      });
    }
    await prisma.user.create({
      data: {
        id: data.id,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email_addresses[0]?.email_address,
        picture: data.image_url,
      },
    });
  }

  if (eventType === "user.updated") {
    const { data } = evt;
    if (!data.id) {
      return new Response("Error: Missing user ID", {
        status: 400,
      });
    }
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        name: `${data.first_name} ${data.last_name}`,
        picture: data.image_url,
      },
    });
  }

  if (eventType === "user.deleted") {
    const { data } = evt;
    if (!data.id) {
      return new Response("Error: Missing user ID", {
        status: 400,
      });
    }
    await prisma.user.delete({
      where: {
        id: data.id,
      },
    });
  }
  return new Response("Webhook received", { status: 200 });
}
