import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = (session.user as any)?.role === "ADMIN";
    const userId = session.user?.id as string;

    const bookings = await db.booking.findMany({
      where: isAdmin ? {} : { userId },
      include: {
        package: { include: { hotel: true } },
        user: { select: { id: true, name: true, email: true, phone: true, avatar: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookings });
  } catch (err) {
    console.error("GET /api/bookings error:", err);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Please sign in to book" }, { status: 401 });
    }

    const body = await req.json();
    const { packageId, cardType, nameOnCard, cardNumber, expiryMonth, expiryYear, cvv, travelDate } = body;

    if (!packageId || !cardType || !nameOnCard || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      return NextResponse.json({ error: "All payment fields are required" }, { status: 400 });
    }

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      return NextResponse.json({ error: "Invalid card number" }, { status: 400 });
    }

    const pkg = await db.package.findUnique({ where: { id: packageId } });
    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    if (pkg.status !== "ACTIVE") {
      return NextResponse.json({ error: "Package is not available" }, { status: 400 });
    }

    const booking = await db.booking.create({
      data: {
        userId: session.user?.id as string,
        packageId,
        cardType,
        nameOnCard,
        cardLast4: cardNumber.replace(/\s/g, "").slice(-4),
        expiryMonth,
        expiryYear,
        amount: pkg.salePrice ?? pkg.price,
        status: "CONFIRMED",
        travelDate: travelDate ? new Date(travelDate) : null,
      },
      include: {
        package: { include: { hotel: true } },
      },
    });

    return NextResponse.json(
      { success: true, message: "Booking confirmed!", booking },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
