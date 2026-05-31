import type { Metadata } from "next";
import { FeedbackForm } from "./FeedbackForm";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Share your travel experience and feedback with TRAVELIX.",
};

export const dynamic = "force-dynamic";

export default function FeedbackPage() {
  return <FeedbackForm />;
}
