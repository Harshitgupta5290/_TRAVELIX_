import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our travel experts at TRAVELIX.",
};

export default function ContactPage() {
  return <ContactForm />;
}
