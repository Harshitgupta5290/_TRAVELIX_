"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Globe, Users, Star, Headphones } from "lucide-react";

const stats = [
  {
    icon: Globe,
    value: 500,
    suffix: "+",
    label: "Destinations",
    description: "Across 50+ countries",
    color: "from-brand-500 to-brand-600",
    bg: "bg-brand-50 dark:bg-brand-950/30",
  },
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Happy Travelers",
    description: "Trusted worldwide",
    color: "from-ocean-500 to-ocean-600",
    bg: "bg-ocean-50 dark:bg-ocean-950/30",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "★",
    label: "Average Rating",
    description: "From verified travelers",
    color: "from-gold-500 to-gold-600",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
  },
  {
    icon: Headphones,
    value: 24,
    suffix: "/7",
    label: "Support",
    description: "Round the clock help",
    color: "from-green-500 to-green-600",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
];

function CountUp({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(end % 1 !== 0 ? 1 : 0)));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count % 1 !== 0 ? count.toFixed(1) : count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-50/50 via-transparent to-transparent dark:from-brand-950/20" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Numbers that tell our story of delivering exceptional travel experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl p-7 text-center ${stat.bg} border border-border/40 hover:border-border/80 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 shadow-md`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-4xl font-heading font-black text-foreground mb-1">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
