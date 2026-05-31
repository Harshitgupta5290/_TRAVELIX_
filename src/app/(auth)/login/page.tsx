import { Suspense } from "react";
import { LoginClient } from "./LoginClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign In" };
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="animate-pulse h-64 bg-muted rounded-xl" />}>
      <LoginClient />
    </Suspense>
  );
}
