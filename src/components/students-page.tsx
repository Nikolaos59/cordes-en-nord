"use client";

import { useState } from "react";
import { StudentDialog } from "@/components/student-dialog";
import { StudentList } from "@/components/student-list";
import { useStudents } from "@/components/student-store";

export function StudentsPage() {
  const { students, addStudent } = useStudents();
  const [dialogOpen, setDialogOpen] = useState(false);
  return <>
    <section className="welcome-row"><div><div className="eyebrow">VOTRE CLASSE</div><h1>Mes élèves <span className="wave">✳</span></h1><p className="welcome-sub">Un parcours qui grandit avec chacun.</p></div><button className="button button-dark" onClick={() => setDialogOpen(true)}><span className="plus">＋</span> Ajouter un élève</button></section>
    <article className="panel students-panel"><div className="panel-heading"><div><div className="eyebrow">{students.length} PROFILS</div><h3>La classe</h3></div><span className="text-link">Progression individuelle</span></div><StudentList students={students} /></article>
    <StudentDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onAdd={addStudent} />
  </>;
}
