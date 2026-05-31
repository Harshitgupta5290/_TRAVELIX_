import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const categories = await db.category.findMany({
      include: {
        _count: { select: { packages: true, hotels: true } },
      },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ categories });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, image } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const slug = slugify(`${name}-${Date.now()}`);
    const category = await db.category.create({
      data: { name: name.trim(), slug, image: image || null },
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
