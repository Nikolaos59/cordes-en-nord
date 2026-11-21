import type { Metadata } from "next";
import { StudentsPage } from "@/components/students-page";

export const metadata: Metadata = { title: "Mes élèves" };

export default function StudentsRoute() {
  return <StudentsPage />;
}
