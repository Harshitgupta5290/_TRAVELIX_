"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
    rating: 5,
    text: "TRAVELIX made our Goa trip absolutely magical! The hotel they chose was stunning and the package pricing was unbeatable. Highly recommend to everyone!",
    package: "Goa Beach Paradise - 5 Days",
  },
  {
    name: "Rahul Verma",
    location: "Delhi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "Booked the Kerala backwaters package and it was a dream come true. Everything was so well organized — transfers, hotels, sightseeing. Worth every rupee!",
    package: "Kerala Backwaters - 7 Days",
  },
  {
    name: "Anita Patel",
    location: "Bangalore",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "The website is so easy to use and the deals are genuinely great. Customer support was extremely responsive when we had a query. 10/10 experience!",
    package: "Rajasthan Heritage Tour - 10 Days",
  },
  {
    name: "Amit Kumar",
    location: "Pune",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 5,
    text: "Went to Manali with my family through TRAVELIX. The snow was breathtaking and hotel was cozy. My kids are already asking for the next trip!",
    package: "Manali Snow Adventure - 6 Days",
  },
  {
    name: "Sneha Joshi",
    location: "Hyderabad",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80",
    rating: 5,
    text: "Honeymoon package in Maldives was beyond perfect. TRAVELIX handled every detail with care. We felt like royalty the entire trip!",
    package: "Maldives Honeymoon - 5 Days",
  },
  {
    name: "Vikram Singh",
    location: "Jaipur",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 4,
    text: "Great value for money! The Bali package included so much — temples, rice terraces, beaches. A very comprehensive itinerary at a fair price.",
    package: "Bali Explorer - 8 Days",
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-muted/20 dark:bg-muted/10 overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-50 dark:bg-gold-950/30 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400 text-sm font-semibold mb-4">
            ⭐ Traveler Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            What Our <span className="gradient-text">Travelers Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Real stories from real travelers who discovered the world with TRAVELIX.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card rounded-2xl p-7 border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 opacity-10">
                <Quote className="w-10 h-10 text-brand-500" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${j < t.rating ? "fill-gold-500 text-gold-500" : "text-muted-foreground"}`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-foreground/80 leading-relaxed mb-5 line-clamp-4">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Package */}
              <div className="text-xs text-brand-500 font-semibold bg-brand-50 dark:bg-brand-950/30 px-3 py-1.5 rounded-lg inline-block mb-5">
                ✈️ {t.package}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=f15019&color=fff`;
                  }}
                />
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">📍 {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
