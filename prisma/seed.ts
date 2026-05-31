import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Seeding TRAVELIX database...");

  // ─── Clean existing data ──────────────────────────────────────────────────
  await db.booking.deleteMany();
  await db.review.deleteMany();
  await db.feedback.deleteMany();
  await db.contact.deleteMany();
  await db.fAQ.deleteMany();
  await db.package.deleteMany();
  await db.hotel.deleteMany();
  await db.category.deleteMany();
  await db.session.deleteMany();
  await db.account.deleteMany();
  await db.user.deleteMany();

  // ─── Users ────────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("admin123", 12);
  const userPassword = await bcrypt.hash("user123", 12);

  const admin = await db.user.create({
    data: {
      name: "Admin User",
      email: "admin@travelix.com",
      password: adminPassword,
      role: "ADMIN",
      phone: "9999999999",
      city: "Mumbai",
      country: "India",
    },
  });

  const users = await Promise.all([
    db.user.create({
      data: {
        name: "Priya Sharma",
        email: "priya@example.com",
        password: userPassword,
        role: "USER",
        phone: "9876543210",
        city: "Delhi",
        country: "India",
      },
    }),
    db.user.create({
      data: {
        name: "Rahul Verma",
        email: "rahul@example.com",
        password: userPassword,
        role: "USER",
        phone: "9871234567",
        city: "Bangalore",
        country: "India",
      },
    }),
    db.user.create({
      data: {
        name: "Anita Patel",
        email: "anita@example.com",
        password: userPassword,
        role: "USER",
        phone: "9865432101",
        city: "Pune",
        country: "India",
      },
    }),
  ]);

  // ─── Categories ───────────────────────────────────────────────────────────
  const [honeymoon, beach, heritage, adventure, family, weekend] = await Promise.all([
    db.category.create({ data: { name: "Honeymoon", slug: "honeymoon", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80" } }),
    db.category.create({ data: { name: "Beach", slug: "beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" } }),
    db.category.create({ data: { name: "Heritage", slug: "heritage", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=80" } }),
    db.category.create({ data: { name: "Adventure", slug: "adventure", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80" } }),
    db.category.create({ data: { name: "Family", slug: "family", image: "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=400&q=80" } }),
    db.category.create({ data: { name: "Weekend Trips", slug: "weekend-trips", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80" } }),
  ]);

  // ─── Hotels ───────────────────────────────────────────────────────────────
  const hotels = await Promise.all([
    db.hotel.create({
      data: {
        name: "The Grand Goa Resort",
        slug: "grand-goa-resort",
        city: "Goa",
        country: "India",
        description: "Nestled on a pristine beach, The Grand Goa Resort offers world-class amenities with panoramic ocean views. Experience luxury redefined in the heart of Goa's coastal paradise.",
        image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
        amenities: JSON.stringify(["Pool", "Spa", "WiFi", "Restaurant", "Bar", "Gym", "Beach Access", "AC"]),
        stars: 5,
        pricePerNight: 12000,
        featured: true,
        categoryId: beach.id,
      },
    }),
    db.hotel.create({
      data: {
        name: "Taj Mahal Palace, Agra",
        slug: "taj-mahal-palace-agra",
        city: "Agra",
        country: "India",
        description: "Experience royal Indian hospitality at the Taj Mahal Palace. Stunning views of the iconic Taj Mahal and exquisite Mughal-inspired architecture create an unforgettable stay.",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
        amenities: JSON.stringify(["Pool", "Spa", "WiFi", "Restaurant", "Heritage Tours", "AC", "Room Service"]),
        stars: 5,
        pricePerNight: 18000,
        featured: true,
        categoryId: heritage.id,
      },
    }),
    db.hotel.create({
      data: {
        name: "Kerala Backwaters Retreat",
        slug: "kerala-backwaters-retreat",
        city: "Alleppey",
        country: "India",
        description: "A magical houseboat experience floating through the serene backwaters of Kerala. Wake up to the sound of birds and the gentle lapping of water.",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
        amenities: JSON.stringify(["Houseboat", "WiFi", "Local Cuisine", "Guided Tours", "AC", "Deck"]),
        stars: 4,
        pricePerNight: 8500,
        featured: true,
        categoryId: honeymoon.id,
      },
    }),
    db.hotel.create({
      data: {
        name: "Snow Valley Resort, Manali",
        slug: "snow-valley-manali",
        city: "Manali",
        country: "India",
        description: "Perched in the Himalayan mountains, Snow Valley Resort offers breathtaking snow-capped views, cozy fireplaces, and adventure activities for thrill-seekers.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        amenities: JSON.stringify(["Mountain View", "Fireplace", "WiFi", "Restaurant", "Skiing", "Trekking", "AC"]),
        stars: 4,
        pricePerNight: 7000,
        featured: false,
        categoryId: adventure.id,
      },
    }),
    db.hotel.create({
      data: {
        name: "Lux Maldives Water Villa",
        slug: "lux-maldives-water-villa",
        city: "North Malé Atoll",
        country: "Maldives",
        description: "Step directly into crystal-clear turquoise waters from your overwater villa. Ultimate luxury in paradise with private plunge pool and coral reef snorkeling.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
        amenities: JSON.stringify(["Overwater Villa", "Private Pool", "Snorkeling", "Spa", "Gourmet Dining", "WiFi", "Transfer"]),
        stars: 5,
        pricePerNight: 45000,
        featured: true,
        categoryId: honeymoon.id,
      },
    }),
    db.hotel.create({
      data: {
        name: "Rajasthan Heritage Haveli",
        slug: "rajasthan-heritage-haveli",
        city: "Jaipur",
        country: "India",
        description: "A restored 18th-century Haveli in the heart of Jaipur's Pink City. Beautifully decorated rooms, rooftop dining under the stars, and traditional Rajasthani culture.",
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80",
        amenities: JSON.stringify(["Heritage Architecture", "Rooftop Restaurant", "Cultural Shows", "WiFi", "AC", "Camel Safari"]),
        stars: 4,
        pricePerNight: 9500,
        featured: false,
        categoryId: heritage.id,
      },
    }),
  ]);

  const [goaHotel, agraHotel, keralaHotel, manaliHotel, maldivesHotel, jaipurHotel] = hotels;

  // ─── Packages ─────────────────────────────────────────────────────────────
  const packages = await Promise.all([
    db.package.create({
      data: {
        title: "Goa Beach Paradise",
        slug: "goa-beach-paradise",
        source: "Mumbai",
        destination: "Goa",
        description: "Escape to the golden beaches of Goa! Enjoy 5 days of sun, sea, and sand with luxury beach resort stays, water sports, and vibrant nightlife.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
        days: 5,
        nights: 4,
        persons: 2,
        price: 25000,
        salePrice: 19999,
        medium: "FLIGHT",
        includes: JSON.stringify(["Return flights", "Beach resort stay (4 nights)", "Daily breakfast", "Airport transfers", "Water sports activity", "Goa sightseeing tour"]),
        highlights: JSON.stringify(["Baga & Calangute beaches", "Old Goa churches UNESCO site", "Dudhsagar Falls day trip", "Evening cruise on Mandovi River"]),
        featured: true,
        status: "ACTIVE",
        hotelId: goaHotel.id,
        categoryId: beach.id,
      },
    }),
    db.package.create({
      data: {
        title: "Taj Mahal Heritage Tour",
        slug: "taj-mahal-heritage-tour",
        source: "Delhi",
        destination: "Agra",
        description: "Witness the eternal symbol of love — the Taj Mahal. A magical 3-day journey through Mughal history, royal forts, and exquisite architecture.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
        days: 3,
        nights: 2,
        persons: 2,
        price: 15000,
        salePrice: 12500,
        medium: "TRAIN",
        includes: JSON.stringify(["Agra Cantonment train tickets", "Heritage hotel stay (2 nights)", "Taj Mahal sunrise visit", "Guided Agra Fort tour", "All breakfasts", "Welcome dinner"]),
        highlights: JSON.stringify(["Sunrise at Taj Mahal", "Agra Fort (UNESCO)", "Mehtab Bagh moonrise view", "Local marble craft workshop"]),
        featured: true,
        status: "ACTIVE",
        hotelId: agraHotel.id,
        categoryId: heritage.id,
      },
    }),
    db.package.create({
      data: {
        title: "Kerala Backwaters Honeymoon",
        slug: "kerala-backwaters-honeymoon",
        source: "Bangalore",
        destination: "Kerala",
        description: "A romantic escape through the emerald backwaters of God's Own Country. Houseboat stays, Ayurvedic spa treatments, and stunning hill stations.",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
        days: 7,
        nights: 6,
        persons: 2,
        price: 55000,
        salePrice: 45000,
        medium: "FLIGHT",
        includes: JSON.stringify(["Return flights", "Luxury houseboat (2 nights)", "Hill station resort (2 nights)", "Beach resort (2 nights)", "Breakfast & dinner daily", "Ayurvedic spa for two", "All transfers"]),
        highlights: JSON.stringify(["Alleppey houseboat cruise", "Munnar tea gardens", "Varkala cliffs & beach", "Kathakali cultural show", "Periyar wildlife sanctuary"]),
        featured: true,
        status: "ACTIVE",
        hotelId: keralaHotel.id,
        categoryId: honeymoon.id,
      },
    }),
    db.package.create({
      data: {
        title: "Manali Snow Adventure",
        slug: "manali-snow-adventure",
        source: "Delhi",
        destination: "Manali",
        description: "Conquer the majestic Himalayas! 6 days of skiing, trekking, river rafting, and snow activities in the breathtaking Manali valley.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        days: 6,
        nights: 5,
        persons: 4,
        price: 35000,
        medium: "BUS",
        includes: JSON.stringify(["AC Volvo bus both ways", "Mountain resort stay (5 nights)", "Daily breakfast", "Skiing equipment rental", "River rafting session", "Rohtang Pass excursion", "Local guide"]),
        highlights: JSON.stringify(["Rohtang Pass snow point", "Solang Valley skiing", "Beas River rafting", "Old Manali cultural walk", "Hadimba Temple visit"]),
        featured: false,
        status: "ACTIVE",
        hotelId: manaliHotel.id,
        categoryId: adventure.id,
      },
    }),
    db.package.create({
      data: {
        title: "Maldives Luxury Escape",
        slug: "maldives-luxury-escape",
        source: "Mumbai",
        destination: "Maldives",
        description: "The ultimate romantic getaway in paradise. Overwater villas, crystal-clear lagoons, world-class snorkeling, and gourmet dining under the stars.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
        days: 5,
        nights: 4,
        persons: 2,
        price: 180000,
        salePrice: 155000,
        medium: "FLIGHT",
        includes: JSON.stringify(["Return international flights", "Overwater villa (4 nights)", "All meals (Full Board)", "Private speedboat transfer", "Snorkeling & diving sessions", "Sunset cruise", "Spa treatment for two"]),
        highlights: JSON.stringify(["Overwater villa experience", "Private beach", "Coral reef snorkeling", "Dolphin watching cruise", "Underwater restaurant dinner"]),
        featured: true,
        status: "ACTIVE",
        hotelId: maldivesHotel.id,
        categoryId: honeymoon.id,
      },
    }),
    db.package.create({
      data: {
        title: "Rajasthan Royal Heritage Tour",
        slug: "rajasthan-royal-heritage-tour",
        source: "Delhi",
        destination: "Rajasthan",
        description: "Explore the Land of Kings! A grand 10-day journey through Jaipur, Jodhpur, Udaipur, and Jaisalmer — royal palaces, golden deserts, and living history.",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        days: 10,
        nights: 9,
        persons: 2,
        price: 65000,
        salePrice: 55000,
        medium: "TRAIN",
        includes: JSON.stringify(["Train travel between cities", "Heritage haveli stays (9 nights)", "Daily breakfast", "Expert cultural guide", "Desert safari with camel ride", "Pushkar Lake visit", "All city sightseeing"]),
        highlights: JSON.stringify(["Amber Fort, Jaipur", "Mehrangarh Fort, Jodhpur", "Lake Palace, Udaipur", "Jaisalmer Golden Fort", "Thar Desert sunset camel safari"]),
        featured: true,
        status: "ACTIVE",
        hotelId: jaipurHotel.id,
        categoryId: heritage.id,
      },
    }),
    db.package.create({
      data: {
        title: "Bali Explorer",
        slug: "bali-explorer",
        source: "Mumbai",
        destination: "Bali, Indonesia",
        description: "Discover the Island of Gods! Terraced rice paddies, ancient temples, world-class surf, vibrant arts scene, and incredible Balinese cuisine.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        days: 8,
        nights: 7,
        persons: 2,
        price: 75000,
        salePrice: 62000,
        medium: "FLIGHT",
        includes: JSON.stringify(["Return international flights", "Boutique villa stays (7 nights)", "Daily breakfast", "Ubud & Seminyak tours", "Tanah Lot temple visit", "Tegallalang rice terrace", "Airport transfers"]),
        highlights: JSON.stringify(["Tegallalang rice terraces", "Tanah Lot & Uluwatu temples", "Mount Batur sunrise trek", "Ubud art & culture scene", "Seminyak beach & nightlife"]),
        featured: false,
        status: "ACTIVE",
        categoryId: beach.id,
      },
    }),
  ]);

  const [goaPkg, agraPkg, keralaPkg, manaliPkg, maldivesPkg, rajasthanPkg, baliPkg] = packages;

  // ─── Bookings ─────────────────────────────────────────────────────────────
  await Promise.all([
    db.booking.create({
      data: {
        userId: users[0].id,
        packageId: goaPkg.id,
        cardType: "VISA",
        nameOnCard: "Priya Sharma",
        cardLast4: "1234",
        expiryMonth: "12",
        expiryYear: "2026",
        amount: 19999,
        status: "CONFIRMED",
        travelDate: new Date("2024-12-15"),
      },
    }),
    db.booking.create({
      data: {
        userId: users[0].id,
        packageId: keralaPkg.id,
        cardType: "MASTERCARD",
        nameOnCard: "Priya Sharma",
        cardLast4: "5678",
        expiryMonth: "08",
        expiryYear: "2025",
        amount: 45000,
        status: "COMPLETED",
        travelDate: new Date("2024-10-20"),
      },
    }),
    db.booking.create({
      data: {
        userId: users[1].id,
        packageId: rajasthanPkg.id,
        cardType: "VISA",
        nameOnCard: "Rahul Verma",
        cardLast4: "9012",
        expiryMonth: "06",
        expiryYear: "2027",
        amount: 55000,
        status: "CONFIRMED",
        travelDate: new Date("2024-12-22"),
      },
    }),
    db.booking.create({
      data: {
        userId: users[2].id,
        packageId: maldivesPkg.id,
        cardType: "AMEX",
        nameOnCard: "Anita Patel",
        cardLast4: "3456",
        expiryMonth: "03",
        expiryYear: "2026",
        amount: 155000,
        status: "CONFIRMED",
        travelDate: new Date("2025-02-14"),
      },
    }),
  ]);

  // ─── Reviews ──────────────────────────────────────────────────────────────
  await Promise.all([
    db.review.create({ data: { userId: users[0].id, packageId: goaPkg.id, rating: 5, title: "Absolutely loved it!", description: "The beach resort was stunning and the water sports were amazing. Highly recommend!" } }),
    db.review.create({ data: { userId: users[1].id, packageId: agraPkg.id, rating: 5, title: "Taj Mahal at sunrise — magical", description: "Worth every rupee. The heritage hotel was excellent and the Taj at sunrise is a must-see." } }),
    db.review.create({ data: { userId: users[0].id, packageId: keralaPkg.id, rating: 5, title: "Perfect honeymoon!", description: "The houseboat experience was dreamy. Kerala is God's own country for sure!" } }),
    db.review.create({ data: { userId: users[2].id, hotelId: goaHotel.id, rating: 4, title: "Great beach resort", description: "Beautiful location, excellent service. Pool area could be bigger but overall fantastic." } }),
    db.review.create({ data: { userId: users[1].id, hotelId: keralaHotel.id, rating: 5, title: "Magical houseboat!", description: "Waking up to backwaters view was surreal. The food was incredible too." } }),
  ]);

  // ─── FAQs ─────────────────────────────────────────────────────────────────
  await Promise.all([
    db.fAQ.create({ data: { name: "Priya Sharma", subject: "Cancellation policy for Goa package", message: "I need to cancel my Goa trip due to an emergency. Can I get a refund?", reply: "Hi Priya, we're sorry to hear that. If the travel date is more than 24 hours away, you're eligible for a full refund. Please contact our support team and we'll process it right away.", userId: users[0].id } }),
    db.fAQ.create({ data: { name: "Rahul Verma", subject: "Customized package for family of 6", message: "We are a family of 6 (2 adults + 4 kids). Can you create a custom Rajasthan package for us?", reply: "Hello Rahul! Absolutely, we can create a custom family package. Please reach out via our Contact page with your travel dates and budget, and our team will prepare a special itinerary.", userId: users[1].id } }),
  ]);

  // ─── Contacts ─────────────────────────────────────────────────────────────
  await db.contact.create({
    data: { name: "Amit Kumar", email: "amit@example.com", phone: "9823456789", subject: "Group booking inquiry", message: "We have a group of 20 people planning a team outing to Goa. Can you provide special group rates?", read: false },
  });

  console.log("✅ Database seeded successfully!");
  console.log("");
  console.log("📧 Admin credentials:");
  console.log("   Email: admin@travelix.com");
  console.log("   Password: admin123");
  console.log("");
  console.log("👤 Test user credentials:");
  console.log("   Email: priya@example.com");
  console.log("   Password: user123");
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await db.$disconnect();
    process.exit(1);
  });
