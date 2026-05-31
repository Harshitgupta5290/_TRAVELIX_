import { Hero } from "@/components/home/Hero";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { FeaturedHotels } from "@/components/home/FeaturedHotels";
import { StatsSection } from "@/components/home/StatsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import db from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 300;

async function getHomeData() {
  const [featuredPackages, featuredHotels] = await Promise.all([
    db.package.findMany({
      where: { featured: true, status: "ACTIVE" },
      include: {
        hotel: true,
        category: true,
        reviews: { select: { rating: true } },
        _count: { select: { bookings: true, reviews: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    db.hotel.findMany({
      where: { featured: true },
      include: {
        category: true,
        reviews: { select: { rating: true } },
        _count: { select: { reviews: true, packages: true } },
      },
      orderBy: { stars: "desc" },
      take: 6,
    }),
  ]);

  // Fallback: if no featured items, get most recent
  const packages =
    featuredPackages.length >= 3
      ? featuredPackages
      : await db.package.findMany({
          where: { status: "ACTIVE" },
          include: {
            hotel: true,
            category: true,
            reviews: { select: { rating: true } },
            _count: { select: { bookings: true, reviews: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 6,
        });

  const hotels =
    featuredHotels.length >= 3
      ? featuredHotels
      : await db.hotel.findMany({
          include: {
            category: true,
            reviews: { select: { rating: true } },
            _count: { select: { reviews: true, packages: true } },
          },
          orderBy: [{ stars: "desc" }, { createdAt: "desc" }],
          take: 6,
        });

  return { packages, hotels };
}

export default async function HomePage() {
  const { packages, hotels } = await getHomeData();

  return (
    <>
      <Hero />
      <FeaturedPackages packages={packages as any} />
      <StatsSection />
      <FeaturedHotels hotels={hotels as any} />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
