import { Suspense } from "react";
import { ForgotPasswordClient } from "./ForgotPasswordClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password — TRAVELIX",
  description: "Reset your TRAVELIX account password.",
};

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordClient />
    </Suspense>
  );
}
