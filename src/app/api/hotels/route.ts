import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const pageSize = parseInt(searchParams.get("pageSize") ?? "12");
    const city = searchParams.get("city");
    const categoryId = searchParams.get("categoryId");
    const stars = searchParams.get("stars");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured") === "true";

    const where: any = {};
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (categoryId) where.categoryId = categoryId;
    if (stars) where.stars = parseInt(stars);
    if (featured) where.featured = true;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { country: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [items, total] = await Promise.all([
      db.hotel.findMany({
        where,
        include: {
          category: true,
          reviews: { select: { rating: true } },
          _count: { select: { reviews: true, packages: true } },
        },
        orderBy: [{ featured: "desc" }, { stars: "desc" }, { createdAt: "desc" }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.hotel.count({ where }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error("GET /api/hotels error:", err);
    return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, city, country, description, image, image2, amenities, stars, pricePerNight, featured, categoryId } = body;

    if (!name || !city || !description || !image) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const slug = slugify(`${name}-${city}-${Date.now()}`);

    const hotel = await db.hotel.create({
      data: {
        name: name.trim(),
        slug,
        city: city.trim(),
        country: country?.trim() || "India",
        description: description.trim(),
        image,
        image2: image2 || null,
        amenities: JSON.stringify(amenities ?? []),
        stars: parseInt(stars ?? 4),
        pricePerNight: parseFloat(pricePerNight ?? 0),
        featured: Boolean(featured),
        categoryId: categoryId || null,
      },
    });

    return NextResponse.json({ success: true, hotel }, { status: 201 });
  } catch (err) {
    console.error("POST /api/hotels error:", err);
    return NextResponse.json({ error: "Failed to create hotel" }, { status: 500 });
  }
}
