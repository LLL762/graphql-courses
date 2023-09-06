import { Student } from "../types/student";
import { DegreesList } from "./degreesList";

export function StudentItem(props: StudentItemProps) {
  const student = props.student;

  return (
    <div>
      <p>{student.firstName}</p>
      <p>{student.lastName}</p>
      {student.email ? <p>{student.email}</p> : null}
      {student.degrees ? <DegreesList degreesInfos={student.degrees} /> : null}
    </div>
  );
}

interface StudentItemProps {
  student: Student;
}

export function StudentList(props: StudentListProps) {
  return (
    <details>
      <summary>Students</summary>
      {props.students.map((student) => (
        <StudentItem key={student.id} student={student} />
      ))}
    </details>
  );
}

interface StudentListProps {
  students: Student[];
}
