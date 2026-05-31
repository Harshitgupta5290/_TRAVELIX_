"use client";

import { motion } from "framer-motion";
import { Shield, Headphones, Tag, MapPin, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safe & Secure Booking",
    description: "Your payments and personal data are protected with bank-grade encryption and fraud prevention.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Tag,
    title: "Best Price Guarantee",
    description: "We match or beat any comparable offer. Get the best travel deals or we'll refund the difference.",
    color: "from-brand-500 to-brand-600",
    bg: "bg-brand-50 dark:bg-brand-950/30",
  },
  {
    icon: Headphones,
    title: "24/7 Expert Support",
    description: "Our dedicated travel experts are available round the clock to assist you at every step of your journey.",
    color: "from-green-500 to-green-600",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    icon: MapPin,
    title: "Curated Experiences",
    description: "Every destination and hotel is personally vetted by our team to ensure extraordinary experiences.",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: Clock,
    title: "Instant Confirmation",
    description: "Get instant booking confirmation via email with full itinerary details and travel documents.",
    color: "from-ocean-500 to-ocean-600",
    bg: "bg-ocean-50 dark:bg-ocean-950/30",
  },
  {
    icon: Award,
    title: "Award Winning Service",
    description: "Recognized as one of India's top travel platforms, trusted by thousands of satisfied travelers.",
    color: "from-gold-500 to-gold-600",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4">
            🌟 Why TRAVELIX?
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            The{" "}
            <span className="gradient-text">Smarter Way</span>
            {" "}to Travel
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            We don't just book trips — we craft experiences that become lifelong memories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`${feature.bg} rounded-2xl p-7 border border-border/40 hover:border-border/80 transition-all duration-300 hover:-translate-y-1 group`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
