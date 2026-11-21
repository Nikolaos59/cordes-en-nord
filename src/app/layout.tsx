import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StudentProvider } from "@/components/student-store";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cordes en Nord — Apprendre. Comprendre. Jouer.",
    template: "%s | Cordes en Nord",
  },
  description: "La guitare folk et pop-rock pour tous les âges.",
  applicationName: "Cordes en Nord",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StudentProvider>{children}</StudentProvider>
      </body>
    </html>
  );
}
