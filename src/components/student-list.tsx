import type { Student } from "@/components/student-store";

const levelLabels: Record<Student["level"], string> = {
  beginner: "Débutant·e",
  intermediate: "Intermédiaire",
  advanced: "Avancé·e",
};

function formatExperience(months: number) {
  if (months === 0) return "Nouveau";
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${months} mois`;
  if (remainingMonths === 0) return `${years} ${years === 1 ? "an" : "ans"}`;
  return `${years} ${years === 1 ? "an" : "ans"} ${remainingMonths} m`;
}

const statusLabels: Partial<Record<Student["foundationsStatus"], string>> = {
  not_assessed: "Bases à évaluer",
  in_progress: "Bases en travail",
  needs_review: "Bases à consolider",
};

export function StudentList({ students, compact = false }: { students: Student[]; compact?: boolean }) {
  const visibleStudents = compact ? students.slice(0, 4) : students;
  return <div className="student-list">{visibleStudents.map((student) => <div className="student-row" key={student.id}>
    <span className={`avatar ${student.color}`}>{student.initials}</span>
    <span className="student-info"><strong>{student.name}</strong><span>{student.age} ans · {levelLabels[student.level]} · {formatExperience(student.experienceMonths)}</span>{statusLabels[student.foundationsStatus] && <span className="student-status">{statusLabels[student.foundationsStatus]}</span>}</span>
    <span className="progress-track" aria-label={`Progression ${student.progress}%`}><i style={{ width: `${student.progress}%` }} /></span>
    <span className="progress-label">{student.progress}%</span>
  </div>)}</div>;
}
