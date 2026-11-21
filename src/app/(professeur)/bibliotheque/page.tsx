import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Bibliothèque" };

export default function LibraryRoute() {
  return <PlaceholderPage section="RESSOURCES PÉDAGOGIQUES" title="Votre bibliothèque" description="Morceaux, accords et exercices à retrouver ici." />;
}
