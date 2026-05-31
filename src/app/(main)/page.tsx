import { Hero } from "@/components/home/Hero";
import { BookingCategories } from "@/components/home/BookingCategories";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { FeaturedHotels } from "@/components/home/FeaturedHotels";
import { StatsSection } from "@/components/home/StatsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

async function getHomeData() {
  const [packages, hotels] = await Promise.all([
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

  const finalPackages = packages.length >= 3 ? packages : await db.package.findMany({
    where: { status: "ACTIVE" },
    include: { hotel: true, category: true, reviews: { select: { rating: true } }, _count: { select: { bookings: true, reviews: true } } },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const finalHotels = hotels.length >= 3 ? hotels : await db.hotel.findMany({
    include: { category: true, reviews: { select: { rating: true } }, _count: { select: { reviews: true, packages: true } } },
    orderBy: [{ stars: "desc" }, { createdAt: "desc" }],
    take: 6,
  });

  return { packages: finalPackages, hotels: finalHotels };
}

export default async function HomePage() {
  const { packages, hotels } = await getHomeData();

  return (
    <>
      <Hero />
      <BookingCategories />
      <FeaturedPackages packages={packages as any} />
      <PopularDestinations />
      <StatsSection />
      <FeaturedHotels hotels={hotels as any} />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
