import { Webhook } from "svix";
import { headers } from "next/headers";
import type { SessionJSON, UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/generated/prisma";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    return NextResponse.json(
      { error: "Webhook signing secret not configured" },
      { status: 500 },
    );
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing Svix headers" },
      { status: 400 },
    );
  }

  const payload = await req.text();

  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const eventType = evt.type;

  try {
    const data = JSON.parse(payload).data;

    switch (eventType) {
      case "user.created":
        await handleUserCreated(data);
        break;
      case "user.updated":
        await handleUserUpdated(data);
        break;
      case "user.deleted":
        await handleUserDeleted(data);
        break;
      case "session.created":
        await handleSessionCreated(data);
        break;
      case "session.ended":
        await handleSessionEnded(data);
        break;
      case "session.removed":
        await handleSessionRemoved(data);
        break;
      case "session.revoked":
        await handleSessionRevoked(data);
        break;
      default:
        console.log(`Unhandled webhook event type: ${eventType}`);
    }

    return NextResponse.json({
      success: true,
      message: `Webhook processed for event: ${eventType}`,
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

async function handleUserCreated(user: UserJSON) {
  const emailVerified =
    user.email_addresses?.[0]?.verification?.status === "verified"
      ? new Date()
      : null;

  const email = user.email_addresses?.[0]?.email_address;

  if (!email) {
    console.warn("User created without email address:", user.id);
    return;
  }

  try {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: email,
        name: `${user.first_name || ""} ${user.last_name || ""}`.trim() || null,
        image: user.image_url || null,
        emailVerified: emailVerified,
      },
      create: {
        id: user.id,
        email: email,
        name: `${user.first_name || ""} ${user.last_name || ""}`.trim() || null,
        image: user.image_url || null,
        emailVerified: emailVerified,
      },
    });
    console.log(`User created/updated: ${user.id}`);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function handleUserUpdated(user: UserJSON) {
  const emailVerified =
    user.email_addresses?.[0]?.verification?.status === "verified"
      ? new Date()
      : null;

  const email = user.email_addresses?.[0]?.email_address;

  if (!email) {
    console.warn("User updated without email address:", user.id);
    return;
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        email: email,
        name: `${user.first_name || ""} ${user.last_name || ""}`.trim() || null,
        image: user.image_url || null,
        emailVerified: emailVerified,
      },
    });
    console.log(`User updated: ${user.id}`);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

async function handleUserDeleted(user: UserJSON) {
  try {
    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    await prisma.user.delete({
      where: { id: user.id },
    });
    console.log(`User deleted: ${user.id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

async function handleSessionCreated(session: SessionJSON) {
  try {
    const userExists = await prisma.user.findUnique({
      where: { id: session.user_id },
    });

    if (!userExists) {
      console.warn(`Session created for non-existent user: ${session.user_id}`);
      return;
    }

    let expirationTime: Date;

    if (session.expire_at) {
      expirationTime = new Date(session.expire_at);
    } else {
      expirationTime = new Date();
      expirationTime.setDate(expirationTime.getDate() + 7);
    }

    await prisma.session.create({
      data: {
        id: session.id,
        sessionToken: session.id,
        userId: session.user_id,
        expires: expirationTime,
      },
    });
    console.log(
      `Session created: ${session.id} for user: ${session.user_id}, expires: ${expirationTime.toISOString()}`,
    );
  } catch (error) {
    console.error("Error creating session:", error);
  }
}

async function handleSessionEnded(session: SessionJSON) {
  try {
    await prisma.session.delete({
      where: { id: session.id },
    });
    console.log(`Session ended: ${session.id}`);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log(`Session ${session.id} was already deleted`);
      } else {
        console.error("Prisma error ending session:", error);
      }
    }
  }
}

async function handleSessionRemoved(session: SessionJSON) {
  try {
    await prisma.session.delete({
      where: { id: session.id },
    });
    console.log(`Session removed: ${session.id}`);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log(`Session ${session.id} was already deleted`);
      } else {
        console.error("Error removing session:", error);
      }
    }
  }
}

async function handleSessionRevoked(session: SessionJSON) {
  try {
    await prisma.session.delete({
      where: { id: session.id },
    });
    console.log(`Session revoked: ${session.id}`);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log(`Session ${session.id} was already deleted`);
      } else {
        console.error("Error revoking session:", error);
      }
    }
  }
}
