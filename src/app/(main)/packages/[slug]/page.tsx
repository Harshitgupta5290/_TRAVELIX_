import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { PackageDetailClient } from "./PackageDetailClient";
import type { Metadata } from "next";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = await db.package.findUnique({ where: { slug: params.slug } });
  if (!pkg) return { title: "Package Not Found" };
  return {
    title: pkg.title,
    description: pkg.description || `${pkg.days} days trip from ${pkg.source} to ${pkg.destination}`,
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const [pkg, session] = await Promise.all([
    db.package.findUnique({
      where: { slug: params.slug },
      include: {
        hotel: { include: { reviews: { take: 5, orderBy: { createdAt: "desc" } } } },
        category: true,
        reviews: {
          include: { user: { select: { name: true, avatar: true } } },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        _count: { select: { bookings: true, reviews: true } },
      },
    }),
    getServerSession(authOptions),
  ]);

  if (!pkg) notFound();

  return <PackageDetailClient pkg={pkg as any} session={session} />;
}
