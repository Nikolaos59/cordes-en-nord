import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard";

export const metadata: Metadata = { title: "Espace professeur" };

export default function TeacherHomePage() {
  return <Dashboard />;
}
