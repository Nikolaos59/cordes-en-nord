import Link from "next/link";

export function PlaceholderPage({ section, title, description }: { section: string; title: string; description: string }) {
  return <section className="placeholder-route"><div className="welcome-row"><div><div className="eyebrow">{section}</div><h1>{title} <span className="wave">✳</span></h1><p className="welcome-sub">{description}</p></div></div><article className="panel"><div className="page-placeholder"><h2>On accorde les dernières notes.</h2><p>Cette partie arrive dans une prochaine étape de Cordes en Nord.</p><Link href="/professeur">Retour à la vue d’ensemble <span>→</span></Link></div></article></section>;
}
