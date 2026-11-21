"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export function StudentDialog({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (name: string, level: string) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Débutant·e");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;
    onAdd(cleanName, level);
    setName("");
    setLevel("Débutant·e");
    onClose();
  }

  return <dialog ref={dialogRef} className="dialog" onCancel={onClose} onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}>
    <form onSubmit={submit}>
      <button className="dialog-close" type="button" aria-label="Fermer" onClick={onClose}>×</button>
      <div className="eyebrow">NOUVEAU PROFIL</div><h2>Un nouvel élève ?</h2><p>Ajoutez-le à votre classe pour préparer son parcours.</p>
      <label htmlFor="studentName">Prénom et nom</label><input id="studentName" name="studentName" placeholder="Ex. Camille Dupont" required maxLength={48} value={name} onChange={(event) => setName(event.target.value)} />
      <label htmlFor="studentLevel">Niveau actuel</label><select id="studentLevel" value={level} onChange={(event) => setLevel(event.target.value)}><option>Débutant·e</option><option>Intermédiaire</option><option>Avancé·e</option></select>
      <div className="dialog-actions"><button type="button" className="button button-light" onClick={onClose}>Annuler</button><button type="submit" className="button button-dark">Ajouter l’élève</button></div>
    </form>
  </dialog>;
}
