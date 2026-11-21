"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Student = {
  id: string;
  name: string;
  age: number;
  level: "beginner" | "intermediate" | "advanced";
  experienceMonths: number;
  foundationsStatus: "not_assessed" | "in_progress" | "needs_review" | "solid";
  initials: string;
  color: string;
  progress: number;
  grade: string;
};

const sampleStudents: Student[] = [
  { id: "lea-martin", name: "Léa Martin", age: 12, level: "beginner", experienceMonths: 5, foundationsStatus: "in_progress", initials: "LM", color: "av-coral", progress: 72, grade: "Cuivre" },
  { id: "adam-lefebvre", name: "Adam Lefebvre", age: 17, level: "intermediate", experienceMonths: 32, foundationsStatus: "solid", initials: "AL", color: "av-blue", progress: 56, grade: "Bronze" },
  { id: "theo-bernard", name: "Théo Bernard", age: 10, level: "beginner", experienceMonths: 3, foundationsStatus: "not_assessed", initials: "TB", color: "av-yellow", progress: 38, grade: "Cuivre" },
  { id: "ines-caron", name: "Inès Caron", age: 15, level: "intermediate", experienceMonths: 26, foundationsStatus: "in_progress", initials: "IC", color: "av-lilac", progress: 84, grade: "Argent" },
  { id: "jules-moreau", name: "Jules Moreau", age: 13, level: "beginner", experienceMonths: 7, foundationsStatus: "needs_review", initials: "JM", color: "av-blue", progress: 42, grade: "Cuivre" },
  { id: "manon-petit", name: "Manon Petit", age: 18, level: "intermediate", experienceMonths: 44, foundationsStatus: "solid", initials: "MP", color: "av-coral", progress: 68, grade: "Bronze" },
  { id: "noe-dubois", name: "Noé Dubois", age: 9, level: "beginner", experienceMonths: 2, foundationsStatus: "not_assessed", initials: "ND", color: "av-yellow", progress: 29, grade: "Cuivre" },
  { id: "zoe-laurent", name: "Zoé Laurent", age: 16, level: "intermediate", experienceMonths: 39, foundationsStatus: "in_progress", initials: "ZL", color: "av-lilac", progress: 91, grade: "Argent" },
];

type StudentContextValue = {
  students: Student[];
  addStudent: (student: Omit<Student, "id" | "initials" | "color" | "progress" | "grade">) => void;
};

const StudentContext = createContext<StudentContextValue | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState(sampleStudents);
  const value = useMemo<StudentContextValue>(() => ({
    students,
    addStudent(student) {
      const initials = student.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toLocaleUpperCase("fr-FR");
      const colors = ["av-coral", "av-blue", "av-yellow", "av-lilac"];
      setStudents((current) => [{
        id: `${Date.now()}-${current.length}`,
        ...student,
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
