import type { Metadata } from "next";
import { RegisterClient } from "./RegisterClient";

export const metadata: Metadata = { title: "Create Account" };
export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return <RegisterClient />;
}
