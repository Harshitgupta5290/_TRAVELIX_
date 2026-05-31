import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user?.id as string },
      select: {
        id: true, name: true, email: true, phone: true, gender: true,
        dob: true, city: true, state: true, country: true, address: true,
        pinCode: true, avatar: true, role: true, createdAt: true,
        _count: { select: { bookings: true, reviews: true } },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, gender, dob, city, state, country, address, pinCode, avatar } = body;

    const user = await db.user.update({
      where: { id: session.user?.id as string },
      data: {
        name: name?.trim(),
        phone: phone?.trim() || null,
        gender: gender || null,
        dob: dob || null,
        city: city?.trim() || null,
        state: state?.trim() || null,
        country: country?.trim() || null,
        address: address?.trim() || null,
        pinCode: pinCode?.trim() || null,
        avatar: avatar || null,
      },
      select: { id: true, name: true, email: true, phone: true, avatar: true },
    });

    return NextResponse.json({ success: true, user });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
