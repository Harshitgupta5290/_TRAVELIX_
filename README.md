# ✈️ TRAVELIX — Premium Travel Booking Platform

**A full-stack travel booking web application built with Next.js 14, Tailwind CSS, Prisma & NextAuth.js**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/travelix)

---

## 🌟 Features

### For Users
- 🔐 Secure JWT authentication (register, login, logout)
- 🔍 Advanced package search (destination, duration, mode, category, price)
- ✈️ Package booking with integrated payment form
- 🏨 Hotel listings with star ratings, amenities & reviews
- 📋 Booking history with status tracking
- 👤 Full profile management
- 📱 Fully responsive on all devices

### For Admins
- 📊 Dashboard with live stats (packages, hotels, users, bookings, revenue)
- 🏨 Hotel CRUD with image support
- ✈️ Package CRUD with pricing, inclusions, highlights
- 👥 User management
- 📦 Booking management
- 🏷️ Category management

### Design & UX
- 🎭 Animated preloader with progress bar
- 🎨 Modern glassmorphism UI design
- ✨ Framer Motion animations throughout
- 🌙 Dark/Light mode toggle
- 💫 Scroll-triggered animations
- 📊 Animated counter stats
- 🔔 Toast notifications (react-hot-toast)
- ⚡ Skeleton loading states

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Database | SQLite (dev) / PostgreSQL (prod) |
| ORM | Prisma 5 |
| Auth | NextAuth.js v4 |
| Icons | Lucide React |
| Fonts | Inter + Playfair Display |
| Deployment | Vercel |

---

## 🚀 Quick Start

### Prerequisites
- Node.js **18.0+**
- npm

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# 3. Initialize database
npm run db:push
npm run db:seed

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@travelix.com | admin123 |
| **User** | priya@example.com | user123 |

---

## 🌐 Deploy to Vercel

**Local dev uses SQLite (zero config). Vercel uses Neon PostgreSQL.**

### Step 1 — In `prisma/schema.prisma`, change one line

```prisma
provider = "postgresql"   // was "sqlite"
```

### Step 2 — Push to GitHub

```bash
git add . && git commit -m "deploy" && git push
```

### Step 3 — Create project on [vercel.com/new](https://vercel.com/new)

Add these 4 environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Neon connection string (`postgresql://...`) |
| `NEXTAUTH_SECRET` | Any random string (e.g. `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` |

> Get a free Neon database at **[neon.tech](https://neon.tech)** → New Project → copy Connection String.

### Step 4 — Click Deploy ✈️

Vercel runs `prisma generate && next build` automatically (configured in `vercel.json`).

---

## 📁 Project Structure

```
travelix/
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Sample data
├── src/
│   ├── app/
│   │   ├── (main)/       # Public pages
│   │   │   ├── page.tsx  # Home
│   │   │   ├── packages/ # Package listing + detail
│   │   │   ├── hotels/   # Hotel listing + detail
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── faq/
│   │   ├── (auth)/       # Login + Register
│   │   ├── (dashboard)/  # User dashboard
│   │   ├── (admin)/      # Admin panel
│   │   └── api/          # REST API routes
│   ├── components/
│   │   ├── ui/           # Button, Input, Card, Badge
│   │   ├── layout/       # Navbar, Footer, Preloader
│   │   └── home/         # Hero, Packages, Hotels, Stats, etc.
│   ├── lib/
│   │   ├── db.ts         # Prisma client
│   │   ├── auth.ts       # NextAuth config
│   │   └── utils.ts      # Helpers
│   └── types/            # TypeScript types
├── .env.example
├── next.config.js
├── tailwind.config.ts
└── vercel.json
```

---

## ⚙️ Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run db:push      # Push schema to DB
npm run db:seed      # Seed sample data
npm run db:studio    # Visual DB browser
npm run db:generate  # Regenerate Prisma client
```

---

## 🔒 Security Features

- Passwords hashed with bcrypt (12 rounds)
- JWT session tokens
- Role-based access control (USER / ADMIN)
- API route authorization on every endpoint
- Only last 4 card digits stored
- Input validation with Zod
- CSRF protection via NextAuth
- Security headers in vercel.json

---

## 🎨 Design System

### Colors
- **Primary (brand)**: `#f15019` (coral-orange)
- **Ocean**: `#0ea5e9` (sky blue)
- **Gold**: `#f59e0b` (amber)
- Full dark/light mode support via CSS variables

### Typography
- **Headings**: Playfair Display (elegant serif)
- **Body**: Inter (clean sans-serif)

---

## 📦 Sample Data Included

After seeding, you get:
- 6 premium hotels (Goa, Agra, Kerala, Manali, Maldives, Jaipur)
- 7 travel packages across India and international
- 6 travel categories
- 3 users + 4 bookings + 5 reviews

---

## 📄 License

MIT License — free for personal and commercial use.

---

*Built with Next.js, Tailwind CSS, Prisma & ❤️*
