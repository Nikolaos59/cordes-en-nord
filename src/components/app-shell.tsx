"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useStudents } from "@/components/student-store";

const navigation = [
  { href: "/professeur", label: "Vue d’ensemble", icon: "⌂" },
  { href: "/eleves", label: "Mes élèves", icon: "♧" },
  { href: "/bibliotheque", label: "Bibliothèque", icon: "▤" },
  { href: "/programmes", label: "Programmes", icon: "◇" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [today, setToday] = useState("");
  const [toast, setToast] = useState("");
  const { students } = useStudents();

  useEffect(() => {
    setToday(new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "long", timeZone: "Europe/Paris" }).format(new Date()));
  }, []);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar${menuOpen ? " open" : ""}`} id="sidebar">
        <Link className="brand" href="/professeur" aria-label="Cordes en Nord, espace professeur" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M10 29.5 27.8 11.7M13 32.5 30.8 14.7M16 35.5 33.8 17.7"/><path d="M10.6 25.8 7.7 28.7a3.4 3.4 0 0 0 4.8 4.8l2.9-2.9M25.8 10.6l2.9-2.9a3.4 3.4 0 0 1 4.8 4.8l-2.9 2.9"/></svg></span>
          <span className="brand-name">cordes<span>en nord</span></span>
        </Link>
        <div className="workspace-label">ESPACE PROFESSEUR</div>
        <nav className="main-nav" aria-label="Navigation principale">
          {navigation.map((item) => <Link key={item.href} className={`nav-item${pathname === item.href ? " active" : ""}`} href={item.href} onClick={() => setMenuOpen(false)}>
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>{item.label}{item.href === "/eleves" && <span className="nav-count">{students.length}</span>}
          </Link>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-spark">✳</div><strong>Un petit pas à la fois.</strong><p>Chaque accord appris est une victoire.</p><Link href="/programmes">Découvrir la méthode <span>↗</span></Link></div>
          <button className="profile-button" onClick={() => notify("Espace professeur — Nicolas C.")}><span className="avatar avatar-teacher">NC</span><span className="profile-copy"><strong>Nicolas C.</strong><small>Professeur</small></span><span className="dots">···</span></button>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="Ouvrir le menu">☰</button><div className="breadcrumb">Mon espace <span>/</span> <strong>{navigation.find((item) => item.href === pathname)?.label ?? "Mon espace"}</strong></div><div className="topbar-actions"><span className="date-label">{today}</span><button className="icon-button" aria-label="Notifications" onClick={() => notify("Vous êtes à jour. Rien de nouveau pour le moment.")}>♧<i /></button><span className="avatar avatar-teacher avatar-small">NC</span></div></header>
        <div className="content">{children}<footer className="footer-note"><span>✳</span> Fait avec soin, dans le Nord. <span className="footer-right">CORDES EN NORD <i>·</i> V0.1</span></footer></div>
      </main>
      {toast && <div className="toast show" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}
