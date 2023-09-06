import { Course } from "../types/course";
import { Teacher } from "../types/teacher";
import { DegreesList } from "./degreesList";
import { StudentList } from "./studentList";

export interface CourseCardProps {
  course: Course;
}

interface TeacherSecProps {
  teacher: Teacher;
}

function TeacherSec(props: TeacherSecProps) {
  const teacher = props.teacher;
  return (
    <div>
      <h4>Teacher</h4>
      <p>{teacher.firstName}</p>
      <p>{teacher.lastName}</p>
      {teacher.email && <p>{teacher.email}</p>}
      {teacher.degrees && <DegreesList degreesInfos={teacher.degrees} />}
    </div>
  );
}

export function CourseCard(props: CourseCardProps) {
  const course = props.course;

  return (
    <div>
      <h3>{course.name}</h3>
      {course.degree && <p>degree: {course.degree.name}</p>}
      {course.description && <p>{course.description}</p>}
      {course.teacher && <TeacherSec teacher={course.teacher} />}
      {course.students && <StudentList students={course.students} />}
    </div>
  );
}
