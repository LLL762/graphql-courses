import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  useState,
} from "react";
import { FieldsOpts } from "../graphql/coursesQueries";

function ResCheckBox(props: ResCheckBoxProps) {
  const finalName = `${props.name}-${props.field}`;

  return (
    <>
      <label htmlFor={finalName}>{props.field}</label>
      <input
        type="checkbox"
        name={finalName}
        id={finalName}
        onClick={props.onClick}
      />
    </>
  );
}

interface CheckboxesGroupProps {
  disabled?: boolean;
}

interface ResCheckBoxProps {
  name: string;
  field: string;
  onClick: MouseEventHandler<HTMLInputElement>;
}

function TeacherCheckboxes(props: CourseFormChildProps) {
  return (
    <fieldset disabled={props.disabled}>
      <legend>Teacher</legend>
      <ResCheckBox name="teacher" field="email" onClick={props.onClick} />
      <ResCheckBox name="teacher" field="degrees" onClick={props.onClick} />
    </fieldset>
  );
}

function StudentsCheckboxes(props: CourseFormChildProps) {
  return (
    <fieldset disabled={props.disabled}>
      <legend>Students</legend>
      <ResCheckBox name="students" field="email" onClick={props.onClick} />
      <ResCheckBox name="students" field="degrees" onClick={props.onClick} />
    </fieldset>
  );
}

interface CourseFormChildProps extends CheckboxesGroupProps {
  onClick: MouseEventHandler<HTMLInputElement>;
}

interface CoursesFormProps {
  onSubmit: (data: CourseFormData) => void;
}

export interface CourseFormData {
  fields: FieldsOpts;
  id: string;
}

export function CoursesForm(props: CoursesFormProps) {
  const fieldsInit = {
    course: {},
    students: {},
    teacher: {},
  };

  const [fields, setFields] = useState<FieldsOpts>(fieldsInit);
  const [id, setId] = useState<string>();

  const onCheckboxClick = (e: MouseEvent<HTMLInputElement>) => {
    const checked = (e.target as HTMLInputElement).checked;
    const [key1, key2] = (e.target as HTMLInputElement).name?.split("-");
    const newFields = { ...fields };

    // @ts-ignore
    newFields[key1][key2] = checked;

    setFields(newFields);
  };

  const teacherDisabled = !fields?.course?.teacher;
  const studentDisabled = !fields?.course?.students;

  const onReset = () => {
    setFields(fieldsInit);
    setId(undefined);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    id && props.onSubmit({ id: id, fields: fields });
  };

  const isValid = () => {
    return !!id && !isNaN(+id) && +id > 0;
  };

  const onIdInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onIdInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const accept = !isNaN(+e.key) || e.key === "Backspace" || e.key === "Enter";
    !accept && e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="course-id">id </label>
      <input
        onKeyDownCapture={onIdInputKeyDown}
        onChange={onIdInputChange}
        id="course-id"
        name="course-id"
        type="number"
        min={1}
        required
      ></input>
      <ResCheckBox
        name="course"
        field="description"
        onClick={onCheckboxClick}
      />
      <ResCheckBox name="course" field="degree" onClick={onCheckboxClick} />
      <ResCheckBox name="course" field="teacher" onClick={onCheckboxClick} />
      <TeacherCheckboxes
        disabled={teacherDisabled}
        onClick={onCheckboxClick}
      ></TeacherCheckboxes>
      <ResCheckBox name="course" field="students" onClick={onCheckboxClick} />
      <StudentsCheckboxes
        disabled={studentDisabled}
        onClick={onCheckboxClick}
      ></StudentsCheckboxes>
      <button disabled={!isValid()} type="submit">
        submit
      </button>
      <button onClick={onReset} type="reset">
        reset
      </button>
    </form>
  );
}
