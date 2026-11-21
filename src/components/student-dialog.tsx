"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Student } from "@/components/student-store";

type NewStudent = Omit<Student, "id" | "initials" | "color" | "progress" | "grade">;

export function StudentDialog({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (student: NewStudent) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [experienceMonths, setExperienceMonths] = useState("0");
  const [level, setLevel] = useState<Student["level"]>("beginner");
  const [foundationsStatus, setFoundationsStatus] = useState<Student["foundationsStatus"]>("not_assessed");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName || !age) return;
    onAdd({ name: cleanName, age: Number(age), level, experienceMonths: Number(experienceMonths), foundationsStatus });
    setName("");
    setAge("");
    setExperienceMonths("0");
    setLevel("beginner");
    setFoundationsStatus("not_assessed");
    onClose();
  }

  return <dialog ref={dialogRef} className="dialog" onCancel={onClose} onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}>
    <form onSubmit={submit}>
      <button className="dialog-close" type="button" aria-label="Fermer" onClick={onClose}>×</button>
      <div className="eyebrow">NOUVEAU PROFIL</div><h2>Un nouvel élève ?</h2><p>Ajoutez-le à votre classe pour préparer son parcours.</p>
      <label htmlFor="studentName">Prénom et nom</label><input id="studentName" name="studentName" placeholder="Ex. Camille Dupont" required maxLength={48} value={name} onChange={(event) => setName(event.target.value)} />
      <div className="student-form-row"><div><label htmlFor="studentAge">Âge</label><input id="studentAge" type="number" min="3" max="120" required value={age} onChange={(event) => setAge(event.target.value)} /></div><div><label htmlFor="studentExperience">Ancienneté (mois)</label><input id="studentExperience" type="number" min="0" max="1200" required value={experienceMonths} onChange={(event) => setExperienceMonths(event.target.value)} /></div></div>
      <label htmlFor="studentLevel">Niveau actuel</label><select id="studentLevel" value={level} onChange={(event) => setLevel(event.target.value as Student["level"])}><option value="beginner">Débutant·e</option><option value="intermediate">Intermédiaire</option><option value="advanced">Avancé·e</option></select>
      <label htmlFor="studentFoundations">Maîtrise des bases</label><select id="studentFoundations" value={foundationsStatus} onChange={(event) => setFoundationsStatus(event.target.value as Student["foundationsStatus"])}><option value="not_assessed">À évaluer</option><option value="in_progress">En cours d’acquisition</option><option value="needs_review">À consolider</option><option value="solid">Bien acquises</option></select>
      <div className="dialog-actions"><button type="button" className="button button-light" onClick={onClose}>Annuler</button><button type="submit" className="button button-dark">Ajouter l’élève</button></div>
    </form>
  </dialog>;
}
