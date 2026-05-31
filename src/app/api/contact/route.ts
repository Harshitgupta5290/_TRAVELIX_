import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const contact = await db.contact.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        subject: subject.trim(),
        message: message.trim(),
        userId: session?.user?.id || null,
      },
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully! We'll get back to you soon." },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contacts = await db.contact.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    });

    return NextResponse.json({ contacts });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}
