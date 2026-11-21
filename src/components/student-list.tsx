import type { Student } from "@/components/student-store";

export function StudentList({ students, compact = false }: { students: Student[]; compact?: boolean }) {
  const visibleStudents = compact ? students.slice(0, 4) : students;
  return <div className="student-list">{visibleStudents.map((student) => <div className="student-row" key={student.id}>
    <span className={`avatar ${student.color}`}>{student.initials}</span>
    <span className="student-info"><strong>{student.name}</strong><span>{student.note} · {student.grade}</span></span>
    <span className="progress-track" aria-label={`Progression ${student.progress}%`}><i style={{ width: `${student.progress}%` }} /></span>
    <span className="progress-label">{student.progress}%</span>
  </div>)}</div>;
}
