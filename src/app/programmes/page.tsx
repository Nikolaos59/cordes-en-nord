import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Programmes" };

export default function ProgramsRoute() {
  return <PlaceholderPage section="PARCOURS PERSONNALISÉS" title="Les programmes" description="Composez un chemin musical adapté à chaque élève." />;
}
