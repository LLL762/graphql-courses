import { useState } from "react";
import { CourseFormData, CoursesForm } from "./components/coursesForm";
import { FieldsOpts, buildQueryInner } from "./graphql/coursesQueries";
import { gql, useLazyQuery } from "@apollo/client";
import { CourseCard } from "./components/courseCard";
import "./style/form.css";

export function CoursesPage() {
  const [id, setId] = useState<string>();
  const [fields, setFields] = useState<FieldsOpts>();

  const query = gql`
    query Course($id: ID) {
      courseById(id: $id)
        ${buildQueryInner(fields)}
    }
  `;

  const [getCourse, { data, loading, error }] = useLazyQuery(query, {
    variables: { id: id },
  });

  const onFormSubmit = (formData: CourseFormData) => {
    setId(formData.id);
    setFields(formData.fields);
    getCourse();
  };

  return (
    <div>
      <CoursesForm onSubmit={onFormSubmit}></CoursesForm>
      {data?.courseById && <CourseCard course={data?.courseById} />}
      {data && !data?.courseById && <p>not found</p>}
      {loading && <p>loading...</p>}
      {error && <p>error!</p>}
    </div>
  );
}
