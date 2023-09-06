import { FieldsMap, OptKey } from "../../types/optionalKey";
import { Course } from "../types/course";
import { Person } from "../types/person";

const degreeShema = `degree {
   id
   name
}`

const degreesSchema = `degrees {
    ${degreeShema}
    earningDate    
}`

export interface FieldsOpts {
    course?: FieldsMap<Course>;
    teacher?: FieldsMap<Person>;
    students?: FieldsMap<Person>;
}

export function buildQueryInner(fields?: FieldsOpts) {

    const root = fields?.course;
    const teacher = fields?.teacher;
    const students = fields?.students;

    return `
     {
        id
        name
        ${root?.students ? buildStudentsQuery(students) : ''}
        ${root?.teacher ? buildTeacherQuery(teacher) : ''}
        ${root?.description ? 'description' : ''}
        ${root?.degree ? degreeShema : ''}
    }
`;
}

function buildTeacherQuery(fields?: { [P in OptKey<Person>]?: boolean }) {
    return `
    teacher {
        id
        firstName 
        lastName
        ${fields?.email ? 'email' : ''}
        ${fields?.degrees ? buildDegreesQuery() : ''}
    }
`;
}

function buildStudentsQuery(fields?: { [P in OptKey<Person>]?: boolean }) {
    return `
    students {
        id
        firstName 
        lastName
        ${fields?.email ? 'email' : ''}
        ${fields?.degrees ? buildDegreesQuery() : ''}
    }
`;
}

function buildDegreesQuery() {
    return degreesSchema;
}
