"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Student = {
  id: string;
  name: string;
  note: string;
  initials: string;
  color: string;
  progress: number;
  grade: string;
};

const sampleStudents: Student[] = [
  { id: "lea-martin", name: "Léa Martin", note: "Débutante · Folk", initials: "LM", color: "av-coral", progress: 72, grade: "Cuivre" },
  { id: "adam-lefebvre", name: "Adam Lefebvre", note: "Intermédiaire · Pop", initials: "AL", color: "av-blue", progress: 56, grade: "Bronze" },
  { id: "theo-bernard", name: "Théo Bernard", note: "Débutant · Rock", initials: "TB", color: "av-yellow", progress: 38, grade: "Cuivre" },
  { id: "ines-caron", name: "Inès Caron", note: "Intermédiaire · Folk", initials: "IC", color: "av-lilac", progress: 84, grade: "Argent" },
  { id: "jules-moreau", name: "Jules Moreau", note: "Débutant · Pop", initials: "JM", color: "av-blue", progress: 42, grade: "Cuivre" },
  { id: "manon-petit", name: "Manon Petit", note: "Intermédiaire · Rock", initials: "MP", color: "av-coral", progress: 68, grade: "Bronze" },
  { id: "noe-dubois", name: "Noé Dubois", note: "Débutant · Folk", initials: "ND", color: "av-yellow", progress: 29, grade: "Cuivre" },
  { id: "zoe-laurent", name: "Zoé Laurent", note: "Intermédiaire · Pop", initials: "ZL", color: "av-lilac", progress: 91, grade: "Argent" },
];

type StudentContextValue = {
  students: Student[];
  addStudent: (name: string, level: string) => void;
};

const StudentContext = createContext<StudentContextValue | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState(sampleStudents);
  const value = useMemo<StudentContextValue>(() => ({
    students,
    addStudent(name, level) {
      const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toLocaleUpperCase("fr-FR");
      const colors = ["av-coral", "av-blue", "av-yellow", "av-lilac"];
      setStudents((current) => [{
        id: `${Date.now()}-${current.length}`,
        name,
        note: `${level} · Nouveau parcours`,
        initials,
        color: colors[current.length % colors.length],
        progress: 0,
        grade: "Cuivre",
      }, ...current]);
    },
  }), [students]);

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) throw new Error("useStudents doit être utilisé dans StudentProvider.");
  return context;
}
