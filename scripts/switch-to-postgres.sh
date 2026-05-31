#!/bin/bash
# ============================================================
# TRAVELIX — Switch from SQLite (dev) to PostgreSQL (Neon)
# ============================================================
# Run this script once before deploying to Vercel with Neon.
# Usage: bash scripts/switch-to-postgres.sh

set -e

echo "🔄 Switching TRAVELIX to PostgreSQL (Neon)..."

# 1. Update schema.prisma provider
sed -i 's/provider = "sqlite"/provider = "postgresql"/' prisma/schema.prisma

echo "✅ prisma/schema.prisma updated to postgresql"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. Set your Neon DATABASE_URL in .env.local:"
echo "   DATABASE_URL=\"postgresql://USER:PASS@HOST/DBNAME?sslmode=require\""
echo ""
echo "2. Push schema to Neon:"
echo "   npm run db:push"
echo ""
echo "3. Seed Neon database:"
echo "   npm run db:seed"
echo ""
echo "4. In Vercel dashboard → Settings → Environment Variables, add:"
echo "   DATABASE_URL    = (your Neon connection string)"
echo "   NEXTAUTH_SECRET = (run: openssl rand -base64 32)"
echo "   NEXTAUTH_URL    = https://your-app.vercel.app"
echo ""
echo "5. Deploy:"
echo "   vercel --prod"
echo ""
echo "⚠️  To switch BACK to SQLite for local dev:"
echo "   sed -i 's/provider = \"postgresql\"/provider = \"sqlite\"/' prisma/schema.prisma"
