"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StudentDialog } from "@/components/student-dialog";
import { StudentList } from "@/components/student-list";
import { useStudents } from "@/components/student-store";

function useToday() {
  const [date, setDate] = useState("");
  useEffect(() => setDate(new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "Europe/Paris" }).format(new Date())), []);
  return date;
}

export function Dashboard() {
  const { students, addStudent } = useStudents();
  const [dialogOpen, setDialogOpen] = useState(false);
  const today = useToday();
  const agendaDay = useToday();

  return <>
    <section className="welcome-row"><div><div className="eyebrow"><span className="live-dot" />{today.toLocaleUpperCase("fr-FR")}</div><h1>Bonjour Nicolas <span className="wave">✳</span></h1><p className="welcome-sub">La musique avance, un accord après l’autre.</p></div><button className="button button-dark" onClick={() => setDialogOpen(true)}><span className="plus">＋</span> Ajouter un élève</button></section>

    <section className="hero-card"><div className="hero-content"><div className="hero-kicker">VOTRE CLASSE, EN UN COUP D’ŒIL</div><h2>De belles choses<br />se jouent cette semaine.</h2><p>Vos élèves ont travaillé <strong>12 h 40</strong> et franchi <strong>6 nouvelles étapes</strong> depuis lundi.</p><Link href="/eleves" className="hero-link">Voir la progression de la classe <span>→</span></Link></div><div className="hero-art" aria-hidden="true"><div className="sun" /><div className="art-note note-one">♪</div><div className="art-note note-two">♫</div><div className="guitar"><div className="guitar-neck" /><div className="guitar-body"><div className="guitar-hole" /></div><div className="guitar-strings" /></div><div className="plant"><i /><i /><i /><b /></div><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /></div><div className="hero-index">01 <span>—</span> LA CLASSE</div></section>

    <section className="stats-grid" aria-label="Résumé de la classe"><article className="stat-card"><div className="stat-top"><span className="stat-icon mint">♧</span><span className="stat-trend">+2 ce mois</span></div><div className="stat-value">{students.length}<span className="stat-unit"> élèves</span></div><div className="stat-label">dans votre classe</div><div className="mini-avatars">{students.slice(0, 3).map((student) => <span className={`avatar ${student.color}`} key={student.initials}>{student.initials}</span>)}<span className="avatar av-lilac">+{Math.max(students.length - 3, 0)}</span></div></article><article className="stat-card"><div className="stat-top"><span className="stat-icon peach">◷</span><span className="stat-trend">+18 %</span></div><div className="stat-value">12<span className="stat-unit"> h 40</span></div><div className="stat-label">de pratique cette semaine</div><div className="stat-bars" aria-hidden="true"><i style={{ height: "35%" }} /><i style={{ height: "60%" }} /><i style={{ height: "44%" }} /><i style={{ height: "78%" }} /><i style={{ height: "55%" }} /><i style={{ height: "94%" }} /><i style={{ height: "66%" }} /></div></article><article className="stat-card"><div className="stat-top"><span className="stat-icon lilac">✳</span><span className="stat-trend">Cette semaine</span></div><div className="stat-value">6<span className="stat-unit"> étapes</span></div><div className="stat-label">de progression validées</div><div className="grade-pills"><span>Cuivre</span><span>Bronze</span><span className="pill-active">Argent</span></div></article></section>

    <section className="lower-grid"><article className="panel students-panel"><div className="panel-heading"><div><div className="eyebrow">À SUIVRE</div><h3>Vos élèves</h3></div><Link className="text-link" href="/eleves">Toute la classe <span>→</span></Link></div><StudentList students={students} compact /><button className="add-row" onClick={() => setDialogOpen(true)}><span>＋</span> Ajouter un élève</button></article>
      <article className="panel agenda-panel"><div className="panel-heading"><div><div className="eyebrow">AUJOURD’HUI</div><h3>Le programme</h3></div><button className="calendar-button" aria-label="Calendrier">▦</button></div><div className="agenda-date"><span className="date-number">{agendaDay ? new Intl.DateTimeFormat("fr-FR", { day: "numeric", timeZone: "Europe/Paris" }).format(new Date()) : "–"}</span><span>{agendaDay ? new Intl.DateTimeFormat("fr-FR", { month: "long", timeZone: "Europe/Paris" }).format(new Date()) : ""}<small>{agendaDay ? new Intl.DateTimeFormat("fr-FR", { weekday: "long", timeZone: "Europe/Paris" }).format(new Date()) : ""}</small></span><span className="agenda-dot" /><span className="agenda-muted">2 cours</span></div><div className="lesson-item"><div className="lesson-time">14<span>:00</span><small>45 min</small></div><div className="lesson-line line-coral" /><div className="lesson-details"><strong>Léa Martin</strong><span>Rythme &amp; accords ouverts</span></div><span className="lesson-tag tag-coral">Folk</span></div><div className="lesson-item"><div className="lesson-time">16<span>:30</span><small>45 min</small></div><div className="lesson-line line-blue" /><div className="lesson-details"><strong>Adam Lefebvre</strong><span>Enchaînements — G / C / D</span></div><span className="lesson-tag tag-blue">Pop</span></div><div className="agenda-footer"><span className="upcoming-icon">↗</span><span>Prochain cours dans <strong>1 h 24</strong></span><Link href="/programmes">Voir l’agenda</Link></div></article></section>
    <StudentDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onAdd={addStudent} />
  </>;
}
