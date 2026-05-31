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
    const source = searchParams.get("source");
    const destination = searchParams.get("destination");
    const days = searchParams.get("days");
    const categoryId = searchParams.get("categoryId");
    const medium = searchParams.get("medium");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured") === "true";

    const where: any = { status: "ACTIVE" };

    if (source) where.source = { contains: source };
    if (destination) where.destination = { contains: destination };
    if (days) where.days = parseInt(days);
    if (categoryId) where.categoryId = categoryId;
    if (medium) where.medium = medium;
    if (featured) where.featured = true;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { destination: { contains: search } },
        { source: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      db.package.findMany({
        where,
        include: {
          hotel: true,
          category: true,
          reviews: { select: { rating: true } },
          _count: { select: { bookings: true, reviews: true } },
        },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.package.count({ where }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error("GET /api/packages error:", err);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title, source, destination, description, image,
      days, nights, persons, price, salePrice, medium,
      includes, highlights, featured, status, hotelId, categoryId,
    } = body;

    if (!title || !source || !destination || !days || !persons || !price) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const slug = slugify(`${title}-${Date.now()}`);

    const pkg = await db.package.create({
      data: {
        title: title.trim(),
        slug,
        source: source.trim(),
        destination: destination.trim(),
        description: description?.trim() || "",
        image: image || null,
        days: parseInt(days),
        nights: parseInt(nights ?? days - 1),
        persons: parseInt(persons),
        price: parseFloat(price),
        salePrice: salePrice ? parseFloat(salePrice) : null,
        medium: medium || "FLIGHT",
        includes: JSON.stringify(includes ?? []),
        highlights: JSON.stringify(highlights ?? []),
        featured: Boolean(featured),
        status: status || "ACTIVE",
        hotelId: hotelId || null,
        categoryId: categoryId || null,
      },
    });

    return NextResponse.json({ success: true, package: pkg }, { status: 201 });
  } catch (err) {
    console.error("POST /api/packages error:", err);
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}
